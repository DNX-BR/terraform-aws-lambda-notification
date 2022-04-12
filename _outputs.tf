output "sns_topic_arn" {
    value       = var.account_name == "audit" ? aws_sns_topic.notifications[0].arn : ""
    description = "ARN of the SNS topic intended to handle cloudwatch and budget alarms"
}

output "event_bus_arn" {
    value       = var.account_name == "audit" ? data.aws_cloudwatch_event_bus.audit[0].arn : ""
    description = "ARN of the CloudWatch Event Bus of audit account"
}