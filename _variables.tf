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

# variable ecr_enabled {
#     description = "Boolean to indicate wether or not send ECR notifications"
#     type        = bool
# }

# variable gd_enabled {
#     description = "Boolean to indicate wether or not send GuardDuty notifications"
#     type        = bool
# }

# variable sh_enabled {
#     description = "Boolean to indicate wether or not send Security Hub notifications"
#     type        = bool
# }

# variable "allow_from_account_ids" {
#   type        = list(string)
#   default     = []
#   description = "List of accounts to allow publishing to SNS"
# }

variable "sns_topic_name" {
    description = "SNS Topic Name (optional - Creates SNS Topic)"
    type        = string
    default     = ""
}

variable "sns_topic_arn" {
  description = "SNS Topic to use instead of creating one (optional)"
  default     = ""
}

variable "webhook_teams" {
    description = "Microsoft Teams Webhook"
    type        = string
    default     = null
}

variable "endpoint_type" {
    description = "Type of the endpoint where notifications should be sent."
    type        = string
    default     = "google"

    validation {
        condition     = contains(["teams", "google", "slack"], var.endpoint_type)
        error_message = "Valid values for var: endpoint_type are (teams, google, slack)."
    } 
}


variable "webhook_google" {
    description = "Google Chat Webhook"
    type        = string
    default     = null
}

variable "slack" {
    description = "Object containing slack's Token and Channel."
    type        = object({
        token   = string
        channel = string
    })
    default     = {token: null, channel: null} 
}

variable "print_event" {
    description = "Boolean variable to print or not the events."
    default     = false
}

variable "client" {
    description = "Object containing client's name and email."
    type        = object({
        name  = string
        email = string
    })
    default   = {name: null, email: null}
}

variable "ticket_api" {
    description = "Key to send tickets through the API."
    type        = string
    default     = null
}

variable "sns_topic_name_alarm_csi" {
    description = "SNS Topic Name CSI"
    type        = string
    default     = null
}

variable "is_shared" {
    type    = bool
    description = "Boolean variable that indicates whether the account is shared-services or not"
    default     = false
}
