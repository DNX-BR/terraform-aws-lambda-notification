## Requirements

No requirements.

## Providers

| Name | Version |
|------|---------|
| <a name="provider_archive"></a> [archive](#provider\_archive) | n/a |
| <a name="provider_aws"></a> [aws](#provider\_aws) | n/a |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [aws_cloudwatch_event_bus_policy.audit](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_event_bus_policy) | resource |
| [aws_cloudwatch_event_rule.ecr](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_event_rule) | resource |
| [aws_cloudwatch_event_rule.guard_duty](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_event_rule) | resource |
| [aws_cloudwatch_event_rule.security_hub](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_event_rule) | resource |
| [aws_cloudwatch_event_target.ecr](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_event_target) | resource |
| [aws_cloudwatch_event_target.guard_duty](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_event_target) | resource |
| [aws_cloudwatch_event_target.security_hub](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_event_target) | resource |
| [aws_iam_role.event_bus_access](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role) | resource |
| [aws_iam_role.lambda_notification](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role) | resource |
| [aws_iam_role_policy.event_bus_access_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy) | resource |
| [aws_iam_role_policy.lambda_notification](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy) | resource |
| [aws_lambda_function.lambda_notification](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function) | resource |
| [aws_lambda_permission.ecr](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_permission) | resource |
| [aws_lambda_permission.guard_duty](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_permission) | resource |
| [aws_lambda_permission.security_hub](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_permission) | resource |
| [aws_lambda_permission.with_sns](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_permission) | resource |
| [aws_sns_topic.notifications](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sns_topic) | resource |
| [aws_sns_topic_policy.topic_notifications](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sns_topic_policy) | resource |
| [aws_sns_topic_subscription.notification_target](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sns_topic_subscription) | resource |
| [archive_file.lambda_notification](https://registry.terraform.io/providers/hashicorp/archive/latest/docs/data-sources/file) | data source |
| [aws_cloudwatch_event_bus.audit](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/cloudwatch_event_bus) | data source |
| [aws_iam_policy_document.audit_event_bus](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy_document) | data source |
| [aws_iam_policy_document.topic_notifications](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy_document) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_account_name"></a> [account\_name](#input\_account\_name) | Name of the current account | `string` | n/a | yes |
| <a name="input_audit_event_bus_arn"></a> [audit\_event\_bus\_arn](#input\_audit\_event\_bus\_arn) | ARN of the CloudWatch bus created at audit account | `string` | `""` | no |
| <a name="input_aws_account_id"></a> [aws\_account\_id](#input\_aws\_account\_id) | ID of the current account | `string` | n/a | yes |
| <a name="input_endpoint_type"></a> [endpoint\_type](#input\_endpoint\_type) | Channel where notifications should be sent. | `string` | n/a | yes |
| <a name="input_org_id"></a> [org\_id](#input\_org\_id) | Organization ID | `string` | n/a | yes |
| <a name="input_org_name"></a> [org\_name](#input\_org\_name) | Organization name | `string` | n/a | yes |
| <a name="input_slack_channel"></a> [slack\_channel](#input\_slack\_channel) | Slack channel to send notifications | `string` | `""` | no |
| <a name="input_slack_token"></a> [slack\_token](#input\_slack\_token) | Slack BOT Token to sendo notifications | `string` | `""` | no |
| <a name="input_sns_topic_name"></a> [sns\_topic\_name](#input\_sns\_topic\_name) | SNS Topic Name | `string` | `"notification-topic"` | no |
| <a name="input_webhook_google"></a> [webhook\_google](#input\_webhook\_google) | Google Chat Webhook | `string` | `""` | no |
| <a name="input_webhook_teams"></a> [webhook\_teams](#input\_webhook\_teams) | Microsoft Teams Webhook | `string` | `""` | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_event_bus_arn"></a> [event\_bus\_arn](#output\_event\_bus\_arn) | ARN of the CloudWatch Event Bus of audit account |
| <a name="output_sns_topic_arn"></a> [sns\_topic\_arn](#output\_sns\_topic\_arn) | ARN of the SNS topic intended to handle cloudwatch and budget alarms |
