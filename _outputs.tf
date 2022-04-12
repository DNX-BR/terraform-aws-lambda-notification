output "sns_topic_arn" {
    count       = var.account_name == "audit" ? 1 : 0
    value       = aws_sns_topic.notifications.arn
    description = "ARN of the SNS topic intended to handle cloudwatch and budget alarms"
}

output "event_bus_arn" {
    count       = var.account_name == "audit" ? 1 : 0
    value       = data.aws_cloudwatch_event_bus.audit[0].arn
    description = "ARN of the CloudWatch Event Bus of audit account"
}