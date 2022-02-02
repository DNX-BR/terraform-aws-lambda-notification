# regra para o ECR
resource "aws_cloudwatch_event_rule" "ecr_scan" {
  name        = "ecr-image-scan"
  description = "Scan Report"

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


# target da regra
resource "aws_cloudwatch_event_target" "ecr" {
  rule      = aws_cloudwatch_event_rule.ecr_scan.name
  target_id = "ECRtoLambda"
  arn       = aws_lambda_function.lambda_notification.arn
}

resource "aws_cloudwatch_event_target" "gd" {
  rule      = aws_cloudwatch_event_rule.guard_duty.name
  target_id = "GuardDutyToLambda"
  arn       = aws_lambda_function.lambda_notification.arn
}

resource "aws_cloudwatch_event_target" "sh" {
  rule      = aws_cloudwatch_event_rule.security_hub.name
  target_id = "SecurityHubToLambda"
  arn       = aws_lambda_function.lambda_notification.arn
}


# permissão pra invocar a função
resource "aws_lambda_permission" "ecr_eventbridge" {
    statement_id  = "ECRScanEventInvokeLambda"
    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.lambda_notification.function_name
    principal     = "events.amazonaws.com"
    source_arn    = aws_cloudwatch_event_rule.ecr_scan.arn
}

resource "aws_lambda_permission" "guardduty_eventbridge" {
    statement_id  = "GuardDutyEventInvokeLambda"
    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.lambda_notification.function_name
    principal     = "events.amazonaws.com"
    source_arn    = aws_cloudwatch_event_rule.guard_duty.arn
}

resource "aws_lambda_permission" "securityhub_eventbridge" {
    statement_id  = "SecurityHubEventInvokeLambda"
    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.lambda_notification.function_name
    principal     = "events.amazonaws.com"
    source_arn    = aws_cloudwatch_event_rule.security_hub.arn
}