resource "random_string" "random" {
  length  = 8
  special = false
  upper   = false
  number  = false
}

# criando uma role para a função lambda
resource "aws_iam_role" "lambda_notification" {
    name = "lambda-notification-${random_string.random.result}"

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
  name = "lambda_notification-${random_string.random.result}" 

  role = aws_iam_role.lambda_notification.name

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



# politica do topico sns
resource "aws_sns_topic_policy" "topic_notifications" {
  arn    = aws_sns_topic.notifications.arn
  policy = data.aws_iam_policy_document.topic_notifications.json
}

# documento da politica
data "aws_iam_policy_document" "topic_notifications" {
  statement {
    sid = "SNSPublishingPermissions"

    actions = [
      "SNS:Publish",
      "SNS:Receive"
    ]

    principals {
      type        = "Service"
      identifiers = ["budgets.amazonaws.com"]
    }

    resources = [
      aws_sns_topic.notifications.arn,
    ]
  }

  statement {
    sid = "__default_statement_ID"

    actions = [
      "SNS:Subscribe",
      "SNS:SetTopicAttributes",
      "SNS:RemovePermission",
      "SNS:Receive",
      "SNS:Publish",
      "SNS:ListSubscriptionsByTopic",
      "SNS:GetTopicAttributes",
      "SNS:DeleteTopic",
      "SNS:AddPermission",
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceOwner"

      values = [
        local.workspace.aws.account_id,
      ]
    }

    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    resources = [
      aws_sns_topic.notifications.arn,
    ]
  }
}