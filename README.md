## Requirements

No requirements.

## Providers

| Name | Version |
|------|---------|
| <a name="provider_archive"></a> [archive](#provider\_archive) | 2.2.0 |
| <a name="provider_aws"></a> [aws](#provider\_aws) | 3.55.0 |
| <a name="provider_random"></a> [random](#provider\_random) | 3.1.0 |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [aws_cloudwatch_event_rule.ecr_scan](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_event_rule) | resource |
| [aws_cloudwatch_event_rule.guard_duty](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_event_rule) | resource |
| [aws_cloudwatch_event_rule.security_hub](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_event_rule) | resource |
| [aws_cloudwatch_event_target.ecr](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_event_target) | resource |
| [aws_cloudwatch_event_target.gd](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_event_target) | resource |
| [aws_cloudwatch_event_target.sh](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_event_target) | resource |
| [aws_iam_role.lambda_notification](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role) | resource |
| [aws_iam_role_policy.lambda_notification](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy) | resource |
| [aws_lambda_function.lambda_notification](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function) | resource |
| [aws_lambda_permission.ecr_eventbridge](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_permission) | resource |
| [aws_lambda_permission.guardduty_eventbridge](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_permission) | resource |
| [aws_lambda_permission.securityhub_eventbridge](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_permission) | resource |
| [aws_lambda_permission.with_sns](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_permission) | resource |
| [aws_sns_topic.notifications](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sns_topic) | resource |
| [aws_sns_topic_policy.topic_notifications](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sns_topic_policy) | resource |
| [aws_sns_topic_subscription.notification_target](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sns_topic_subscription) | resource |
| [random_string.random](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string) | resource |
| [archive_file.lambda_notification](https://registry.terraform.io/providers/hashicorp/archive/latest/docs/data-sources/file) | data source |
| [aws_iam_policy_document.topic_notifications](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy_document) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_client"></a> [client](#input\_client) | Object containing client's name and email. | <pre>object({<br>        name  = string<br>        email = string<br>    })</pre> | <pre>{<br>  "email": null,<br>  "name": null<br>}</pre> | no |
| <a name="input_endpoint_type"></a> [endpoint\_type](#input\_endpoint\_type) | Type of the endpoint where notifications should be sent. | `string` | `"google"` | no |
| <a name="input_print_event"></a> [print\_event](#input\_print\_event) | Boolean variable to print or not the events. | `bool` | `false` | no |
| <a name="input_slack"></a> [slack](#input\_slack) | Object containing slack's Token and Channel. | <pre>object({<br>        token   = string<br>        channel = string<br>    })</pre> | <pre>{<br>  "channel": null,<br>  "token": null<br>}</pre> | no |
| <a name="input_sns_topic_name_alarm"></a> [sns\_topic\_name\_alarm](#input\_sns\_topic\_name\_alarm) | SNS Topic Name | `string` | `"notification-topic"` | no |
| <a name="input_sns_topic_name_alarm_csi"></a> [sns\_topic\_name\_alarm\_csi](#input\_sns\_topic\_name\_alarm\_csi) | SNS Topic Name CSI | `string` | `null` | no |
| <a name="input_ticket_api"></a> [ticket\_api](#input\_ticket\_api) | Key to send tickets through the API. | `string` | `null` | no |
| <a name="input_webhook_google"></a> [webhook\_google](#input\_webhook\_google) | Google Chat Webhook | `string` | `null` | no |
| <a name="input_webhook_teams"></a> [webhook\_teams](#input\_webhook\_teams) | Microsoft Teams Webhook | `string` | `null` | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_sns_topic"></a> [sns\_topic](#output\_sns\_topic) | ARN of the SNS topic intended to handle cloudwatch and budget alarms |
