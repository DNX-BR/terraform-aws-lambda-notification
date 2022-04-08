# regra para o ECR
resource "aws_cloudwatch_event_rule" "ecr_scan" {
  name            = "ecr-image-scan"
  description     = "Scan Report"
  event_bus_name  = var.account_name != "audit" ? "" : aws_cloudwatch_event_bus.accounts_events[0].name

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

# regra para o guard duty
resource "aws_cloudwatch_event_rule" "guard_duty" {
  name        = "guard-duty"
  description = "GuardDuty Report"
  event_bus_name  = var.account_name != "audit" ? "" : aws_cloudwatch_event_bus.accounts_events[0].name


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

# regra para o security hub
resource "aws_cloudwatch_event_rule" "security_hub" {
  name        = "security-hub"
  description = "Security Hub Report"
  event_bus_name  = var.account_name != "audit" ? "" : aws_cloudwatch_event_bus.accounts_events[0].name


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

# cria o event bus na audit
resource "aws_cloudwatch_event_bus" "accounts_events" {
  count = var.account_name == "audit" ? 1 : 0
  name  = "${var.org_name}-accounts-events"
}

# documento da política do event bus
data "aws_iam_policy_document" "accounts_events" {
  count = var.account_name == "audit" ? 1 : 0

  statement {
    sid    = "allow_all_accounts_from_organization_to_put_events"
    effect = "Allow"

    actions = [
      "events:PutEvents",
    ]

    resources = aws_cloudwatch_event_bus.accounts_events[0].arn

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

# política do eventbus da conta AUDIT
resource "aws_cloudwatch_event_bus_policy" "accounts_events" {
  count          = var.account_name == "audit" ? 1 : 0
  policy         = data.aws_iam_policy_document.accounts_events[0].json
  event_bus_name = aws_cloudwatch_event_bus.accounts_events[0].name
}

# para a conta AUDIT, o target vai ser o lambda. Para as contas EXCETO audit, o target vai ser o eventbus.
resource "aws_cloudwatch_event_target" "ecr" {
  rule      = aws_cloudwatch_event_rule.ecr_scan.name
  target_id = "ECRtoLambda"
  arn       = var.account_name == "audit" ? aws_lambda_function.lambda_notification[0].arn : aws_cloudwatch_event_bus.accounts_events[0].arn
}

resource "aws_cloudwatch_event_target" "gd" {
  rule      = aws_cloudwatch_event_rule.guard_duty.name
  target_id = "GuardDutyToLambda"
  arn       = var.account_name == "audit" ? aws_lambda_function.lambda_notification[0].arn : aws_cloudwatch_event_bus.accounts_events[0].arn
}

resource "aws_cloudwatch_event_target" "sh" {
  rule      = aws_cloudwatch_event_rule.security_hub.name
  target_id = "SecurityHubToLambda"
  arn       = var.account_name == "audit" ? aws_lambda_function.lambda_notification[0].arn : aws_cloudwatch_event_bus.accounts_events[0].arn
}

# permissão para as regras de AUDIT invocarem a função lambda
resource "aws_lambda_permission" "ecr_eventbridge" {
  count         = var.account_name == "audit" ? 1 : 0
  statement_id  = "ECRScanEventInvokeLambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_notification[0].function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.ecr_scan.arn
}

resource "aws_lambda_permission" "guardduty_eventbridge" {
  count         = var.account_name == "audit" ? 1 : 0
  statement_id  = "GuardDutyEventInvokeLambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_notification[0].function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.guard_duty.arn
}

resource "aws_lambda_permission" "securityhub_eventbridge" {
  count         = var.account_name == "audit" ? 1 : 0
  statement_id  = "SecurityHubEventInvokeLambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_notification[0].function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.security_hub.arn
}