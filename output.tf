output "sns_topic" {
    value       = aws_sns_topic.notifications.arn
    description = "ARN of the SNS topic intended to handle cloudwatch and budget alarms"
}