# ---- REGRAS PARA O ECR, GUARD DUTY E SECURITY HUB ---- #

resource "aws_cloudwatch_event_rule" "ecr" {
  name            = "ecr-image-scan"
  description     = "Scan Report"

  event_pattern = <<EOF
{
  "source": [
    "aws.ecr"
  ],
  "detail-type": [
    "ECR Image Scan"
  ]
}
EOF
}

resource "aws_cloudwatch_event_rule" "guard_duty" {
  name        = "guard-duty"
  description = "GuardDuty Report"

  event_pattern = <<EOF
{
  "source": [
    "aws.guardduty"
  ],
    "detail-type": [
      "GuardDuty Finding"
  ]
}
EOF
}

resource "aws_cloudwatch_event_rule" "security_hub" {
  name        = "security-hub"
  description = "Security Hub Report"

  event_pattern = <<EOF
{
  "source": [
    "aws.securityhub"
  ],
  "detail-type": [
    "Security Hub Findings - Imported"
  ]
}
EOF
}

# ---- TARGET PARA AS REGRAS DO ECR, GUARD DUTY E SECURITY HUB ---- #
# Para a conta AUDIT, o target vai ser o lambda. Para as demais, o target vai ser o Event Bus.

resource "aws_cloudwatch_event_target" "ecr" {
  rule            = aws_cloudwatch_event_rule.ecr.name
  target_id       = "ECRtoLambda"
  arn             = var.account_name == "audit" ? aws_lambda_function.lambda_notification[0].arn : var.audit_event_bus_arn
  role_arn        = var.account_name == "audit" ? "" : aws_iam_role.event_bus_access[0].arn
}

resource "aws_cloudwatch_event_target" "guard_duty" {
  rule           = aws_cloudwatch_event_rule.guard_duty.name
  target_id      = "GuardDutyToLambda"
  arn            = var.account_name == "audit" ? aws_lambda_function.lambda_notification[0].arn : var.audit_event_bus_arn
  role_arn       = var.account_name == "audit" ? "" : aws_iam_role.event_bus_access[0].arn
}

resource "aws_cloudwatch_event_target" "security_hub" {
  rule           = aws_cloudwatch_event_rule.security_hub.name
  target_id      = "SecurityHubToLambda"
  arn            = var.account_name == "audit" ? aws_lambda_function.lambda_notification[0].arn : var.audit_event_bus_arn
  role_arn       = var.account_name == "audit" ? "" : aws_iam_role.event_bus_access[0].arn
}

# ---- PERMISSÃO PARA AS REGRAS DA CONTA AUDIT INVOCAREM A FUNÇÃO LAMBDA ---- #

resource "aws_lambda_permission" "ecr" {
  count         = var.account_name == "audit" ? 1 : 0
  statement_id  = "ECRScanEventInvokeLambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_notification[0].function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.ecr.arn
}

resource "aws_lambda_permission" "guard_duty" {
  count         = var.account_name == "audit" ? 1 : 0
  statement_id  = "GuardDutyEventInvokeLambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_notification[0].function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.guard_duty.arn
}

resource "aws_lambda_permission" "security_hub" {
  count         = var.account_name == "audit" ? 1 : 0
  statement_id  = "SecurityHubEventInvokeLambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_notification[0].function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.security_hub.arn
}

# ---- POLÍTICA DO EVENT BUS NA CONTA AUDIT ---- #

data "aws_iam_policy_document" "audit_event_bus" {
  count = var.account_name == "audit" ? 1 : 0

  statement {
    sid    = "allow_all_accounts_from_organization_to_put_events"
    
    effect = "Allow"

    actions = [
      "events:PutEvents",
    ]

    resources = [data.aws_cloudwatch_event_bus.audit[0].arn]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    condition {
      test     = "StringEquals"
      variable = "aws:PrincipalOrgID"

      values = [
        var.org_id,
      ]
    }
  }
}

resource "aws_cloudwatch_event_bus_policy" "audit" {
  count          = var.account_name == "audit" ? 1 : 0
  policy         = data.aws_iam_policy_document.audit_event_bus[0].json
  event_bus_name = data.aws_cloudwatch_event_bus.audit[0].name
}

# ---- ROLE E POLÍTICA DAS DEMAIS CONTAS PARA PERMITIR ACESSO AO EVENT BUS ---- #

resource "aws_iam_role" "event_bus_access" {
  count  = var.account_name != "audit" ? 1 : 0

  name   = "audit-event-bus-access"
  
  assume_role_policy = <<EOF
{
	"Version": "2012-10-17",
	"Statement": [
		{
			 "Action": "sts:AssumeRole",
			 "Principal": {
			 "Service": "events.amazonaws.com"
			 },
			 "Effect": "Allow",
			 "Sid": ""
		}
	]
}
EOF
}

resource "aws_iam_role_policy" "event_bus_access_policy" {
  count  = var.account_name != "audit" ? 1 : 0

  name   = "audit-event-bus-access-policy" 

  role   = aws_iam_role.event_bus_access[0].name

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
		{
			"Effect": "Allow",
			"Action": [
				"events:PutEvents"
			],
			"Resource":  "${var.audit_event_bus_arn}"
    }
  ]
}
EOF
}