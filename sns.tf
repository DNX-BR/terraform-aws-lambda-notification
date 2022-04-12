# criação do tópico
resource "aws_sns_topic" "notifications" {
  count = var.account_name == "audit" ? 1 : 0
  name  = var.sns_topic_name
}

# subscrição da função nesse tópico
resource "aws_sns_topic_subscription" "notification_target" {
  count     = var.account_name == "audit" ? 1 : 0
  topic_arn = aws_sns_topic.notifications[0].arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.lambda_notification[0].arn
}

# permissão pro tópico invocar a função
resource "aws_lambda_permission" "with_sns" {
    count         = var.account_name == "audit" ? 1 : 0
    statement_id  = "AllowExecutionFromSNS"
    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.lambda_notification[0].arn
    principal     = "sns.amazonaws.com"
    source_arn    = aws_sns_topic.notifications[0].arn
}

# política do tópico sns
resource "aws_sns_topic_policy" "topic_notifications" {
  count  = var.account_name == "audit" ? 1 : 0
  arn    = aws_sns_topic.notifications[0].arn
  policy = data.aws_iam_policy_document.topic_notifications[0].json
}

# documento da política
data "aws_iam_policy_document" "topic_notifications" {
  count  = var.account_name == "audit" ? 1 : 0

  statement {
    sid = "PublishingPermissions"

    actions = [
      "SNS:Publish",
      "SNS:Receive"
    ]

    effect = "Allow"
    
    principals {
      type        = "Service"
      identifiers = ["budgets.amazonaws.com", "cloudwatch.amazonaws.com"]
    }

    resources = [
      aws_sns_topic.notifications[0].arn,
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
        var.aws_account_id,
      ]
    }

    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    resources = [
      aws_sns_topic.notifications[0].arn,
    ]
  }

  statement {
    sid = "allow_all_accounts_from_organization"

    actions = [
      "SNS:Subscribe",
      "SNS:Receive",
      "SNS:Publish",
      "SNS:GetTopicAttributes",
    ]

    condition {
      test     = "StringEquals"
      variable = "aws:PrincipalOrgID"

      values = [
        var.org_id,
      ]
    }

    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    resources = [
      aws_sns_topic.notifications[0].arn,
    ]
  }
}