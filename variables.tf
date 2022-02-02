variable "sns_topic_name_alarm" {
    description = "SNS Topic Name"
    type        = string
    default     = "notification-topic"
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
        error_message = "Valid values for var: endpoint_type are (teams, google, slack)"
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