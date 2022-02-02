# criação do tópico
resource "aws_sns_topic" "notifications" {
  name = var.sns_topic_name_alarm
}

# subscrição da função nesse tópico
resource "aws_sns_topic_subscription" "notification_target" {
  topic_arn = aws_sns_topic.notifications.arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.lambda_notification.arn
}

# permissão pro topico invocar a função
resource "aws_lambda_permission" "with_sns" {
    statement_id  = "AllowExecutionFromSNS"
    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.lambda_notification.arn
    principal     = "sns.amazonaws.com"
    source_arn    = aws_sns_topic.notifications.arn
}
