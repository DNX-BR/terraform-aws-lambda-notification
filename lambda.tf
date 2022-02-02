# zipando o arquivo
data "archive_file" "lambda_notification" {
  type        = "zip"
  source_dir  = "${path.module}/lambda-function/"
  output_path = "${path.module}/lambda-notif.zip"
  excludes = [
    "samples.js",
    "index.test.js",
    "jest.config.js",
    ".eslintrc.yml",
    "README.md",
    "package.json",
    "package-lock.json"
  ]
}

# criando a função lambda
resource "aws_lambda_function" "lambda_notification" {
  function_name = "lambda-notification"
  role          = aws_iam_role.lambda_notification.arn
  handler       = "index.handler"
  filename      = data.archive_file.lambda_notification.output_path
  runtime       = "nodejs14.x"
  timeout       = 15

  environment {
    variables = {
      ENDPOINT_TYPE            = var.endpoint_type,
      WEBHOOK_GOOGLE           = var.webhook_google,
      WEBHOOK_TEAMS            = var.webhook_teams,
      SLACK_CHANNEL            = var.slack.channel,
      SNS_TOPIC_NAME_ALARM     = var.sns_topic_name_alarm,
      PRINT_EVENT              = var.print_event,
      CLIENT_NAME              = var.client.name,
      CLIENT_EMAIL             = var.client.email,
      OSTICKET_API_KEY         = var.ticket_api,
      SLACK_TOKEN              = var.slack.token,
      SNS_TOPIC_NAME_ALARM_CSI = var.sns_topic_name_alarm_csi
    }
  }
}