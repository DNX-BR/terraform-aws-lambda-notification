# zipando o arquivo
data "archive_file" "lambda_notification" {
  count       = var.account_name == "audit" ? 1 : 0
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

# criando a função lambda apenas na conta audit 
resource "aws_lambda_function" "lambda_notification" {
  count         = var.account_name == "audit" ? 1 : 0
  function_name = "lambda-notification"
  role          = aws_iam_role.lambda_notification[0].arn
  handler       = "index.handler"
  filename      = data.archive_file.lambda_notification[0].output_path
  runtime       = "nodejs14.x"
  timeout       = 15

  environment {
    variables = {
      ENDPOINT_TYPE            = var.endpoint_type,
      WEBHOOK_GOOGLE           = var.webhook_google,
      WEBHOOK_TEAMS            = var.webhook_teams,
      SLACK_CHANNEL            = var.slack.channel,
      SNS_TOPIC_NAME_ALARM     = var.sns_topic_name,
      PRINT_EVENT              = var.print_event,
      CLIENT_NAME              = var.client.name,
      CLIENT_EMAIL             = var.client.email,
      OSTICKET_API_KEY         = var.ticket_api,
      SLACK_TOKEN              = var.slack.token,
      SNS_TOPIC_NAME_ALARM_CSI = var.sns_topic_name_alarm_csi
    }
  }
}

# resource "random_string" "random" {
#   count  = var.account_name == "audit" ? 1 : 0
#   length  = 8
#   special = false
#   upper   = false
#   number  = false
# }

# criando uma role para a função lambda na conta audit
resource "aws_iam_role" "lambda_notification" {
  count  = var.account_name == "audit" ? 1 : 0

  name = "lambda-notification-role"

  assume_role_policy = <<EOF
{
	"Version": "2012-10-17",
	"Statement": [
		{
			 "Action": "sts:AssumeRole",
			 "Principal": {
			 "Service": "lambda.amazonaws.com"
			 },
			 "Effect": "Allow",
			 "Sid": ""
		}
	]
}
EOF
}


# adicionando uma política à role
resource "aws_iam_role_policy" "lambda_notification" {
  count  = var.account_name == "audit" ? 1 : 0

  name = "lambda-notification-policy" 

  role = aws_iam_role.lambda_notification[0].name

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
		{
			"Effect": "Allow",
			"Action": [
				"logs:CreateLogGroup",
				"logs:CreateLogStream",
        "logs:PutLogEvents"
			],
			"Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
EOF
}