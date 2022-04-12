variable aws_account_id {
    description = "ID of the current account"
    type        = string
}

variable account_name {
    description = "Name of the current account"
    type        = string
}

variable org_id {
    description = "Organization ID"
    type        = string
}

variable org_name {
    description = "Organization name"
    type        = string
}

variable "sns_topic_name" {
    description = "SNS Topic Name"
    type        = string
    default     = "notification-topic"
}

variable "audit_event_bus_arn" {
    description = "ARN of the CloudWatch bus created at audit account"
    type        = string
    default     = ""
}

variable "webhook_teams" {
    description = "Microsoft Teams Webhook"
    type        = string
    default     = ""
}

variable "endpoint_type" {
    description = "Channel where notifications should be sent."
    type        = string
    default     = "slack"

    validation {
        condition     = contains(["teams", "google", "slack"], var.endpoint_type)
        error_message = "Valid values for var: endpoint_type are (teams, google, slack)."
    } 
}

variable "webhook_google" {
    description = "Google Chat Webhook"
    type        = string
    default     = ""
}

variable "slack_channel" {
    description = "Slack channel to send notifications"
    type        = string
    default     = ""
}

variable "slack_token" {
    description = "Slack BOT Token to sendo notifications"
    type        = string
    default     = ""
}