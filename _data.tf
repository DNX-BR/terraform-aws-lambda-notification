data "aws_cloudwatch_event_bus" "audit" {
    count = var.account_name == "audit" ? 1 : 0
    name  = "default"
}