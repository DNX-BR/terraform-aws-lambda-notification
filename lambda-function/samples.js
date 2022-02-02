const alertEvent = {
  "Records": [
      {
          "EventSource": "aws:sns",
          "EventVersion": "1.0",
          "EventSubscriptionArn": "arn:aws:sns:us-east-2:201123718756:alertas-aws:dcfe81db-89a1-455f-b0ac-301e2f8c84e0",
          "Sns": {
              "Type": "Notification",
              "MessageId": "1a379833-4c77-528d-a861-c1660c43d2d1",
              "TopicArn": "arn:aws:sns:us-east-2:201123718756:alertas-aws",
              "Subject": "OK: \"vibe-nonprod-lb-dev-alb-latency\" in US East (Ohio)",
              "Message": "{\"AlarmName\":\"vibe-nonprod-lb-dev-alb-latency\",\"AlarmDescription\":\"Load balancer latency for application\",\"AWSAccountId\":\"201123718756\",\"NewStateValue\":\"OK\",\"NewStateReason\":\"Thresholds Crossed: 1 out of the last 2 datapoints [0.0025642349034637954 (29/06/21 15:20:00)] was not greater than the upper thresholds [0.3309826664011767] (minimum 1 datapoint for ALARM -> OK transition).\",\"StateChangeTime\":\"2021-06-29T15:36:20.269+0000\",\"Region\":\"US East (Ohio)\",\"AlarmArn\":\"arn:aws:cloudwatch:us-east-2:201123718756:alarm:vibe-nonprod-lb-dev-alb-latency\",\"OldStateValue\":\"ALARM\",\"Trigger\":{\"Period\":900,\"EvaluationPeriods\":2,\"ComparisonOperator\":\"GreaterThanUpperThreshold\",\"ThresholdMetricId\":\"ad1\",\"TreatMissingData\":\"- TreatMissingData:                    ignore\",\"EvaluateLowSampleCountPercentile\":\"\",\"Metrics\":[{\"Id\":\"m1\",\"MetricStat\":{\"Metric\":{\"Dimensions\":[{\"value\":\"app/lb-dev/699cf0a8ae9d6530\",\"name\":\"LoadBalancer\"}],\"MetricName\":\"TargetResponseTime\",\"Namespace\":\"AWS/ApplicationELB\"},\"Period\":900,\"Stat\":\"p90\"},\"ReturnData\":true},{\"Expression\":\"ANOMALY_DETECTION_BAND(m1, 2)\",\"Id\":\"ad1\",\"Label\":\"TargetResponseTime (Expected)\",\"ReturnData\":true}]}}",
              "Timestamp": "2021-06-29T15:36:20.313Z",
              "SignatureVersion": "1",
              "Signature": "r3+0Ow471cRF0Bagr+wWbUaO2W2uyZXaMzDDHoyPfFhADjfe1MmB5l1/2Uv7R66EtKwuN8hybYsw8W0uH25yXc2gnxN1z0UIQu4KEnuJKDp8tBi51R7gI+FFdcCNfPb1xNaOwcNjXkd/ga/UfWwAPbMp3djYLSCqvY+yFmpI3dq3c55rJ/4KfJsSBq4PBhRRmOkKqhon9Exf+ytmMzN06w3r4FdrCcN2J+jyJvjBelyGCld3eOwJspaYRBjgdLGO8SF+eqqaPZxp8VsrDXn/gcEMIaPj6zp/CpUlWPYx+T8lqIA0h0N8cxjq6+QqB1DmeLOOulNUpU2EF3QTVNDTxA==",
              "SigningCertUrl": "https://sns.us-east-2.amazonaws.com/SimpleNotificationService-010a507c1833636cd94bdb98bd93083a.pem",
              "UnsubscribeUrl": "https://sns.us-east-2.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-2:201123718756:alertas-aws:dcfe81db-89a1-455f-b0ac-301e2f8c84e0",
              "MessageAttributes": {}
          }
      }
  ]
};

const budgetEvent = {
  "Records": [
      {
          "EventSource": "aws:sns",
          "EventVersion": "1.0",
          "EventSubscriptionArn": "arn:aws:sns:us-east-2:058100963274:budget:e2e56949-4ecf-46cd-b5a0-3f62b1e23c0f",
          "Sns": {
              "Type": "Notification",
              "MessageId": "62bd4c7d-8dda-5ef7-93f4-1520c06c8bee",
              "TopicArn": "arn:aws:sns:us-east-2:058100963274:budget",
              "Subject": "AWS Budgets: teste has exceeded your alert threshold",
              "Message": "AWS Budget Notification July 05, 2021\nAWS Account 058100963274\n\nDear AWS Customer,\n\nYou requested that we alert you when the ACTUAL Cost associated with your teste budget is greater than $21.00 for the current month. The ACTUAL Cost associated with this budget is $41.45. You can find additional details below and by accessing the AWS Budgets dashboard [1].\n\nBudget Name: teste\nBudget Type: Cost\nBudgeted Amount: $100.00\nAlert Type: ACTUAL\nAlert Threshold: > $21.00\nACTUAL Amount: $41.45\n\n[1] https://console.aws.amazon.com/billing/home#/budgets\n",
              "Timestamp": "2021-07-05T18:12:06.111Z",
              "SignatureVersion": "1",
              "Signature": "gxuWkqkI478SefbYw6M9cbip422XNXNDAtMO9pQkrptv5fYlAjjHdmI2GcJK3iUug7TgYNeVZjHIzoHCdVFshFUUvgEVJgzlXpBVAbDIB6HzVynyUTSetaqnguMDtKyz/jbHb76S29aI7Ho/GTnUbSYM/MYoPsb5hYsVWoU3+yToyIs+P3khoHzwJGBJqZ7epaAErDcC1UMZ7QYfss4LP4BQV9C7QvFBSLA6sxt0/XqJaMDajODFk6qqgFKncLN79a7aOj2d9hU1k99dyvpkBK4HPfgNck5oc1m+8VdwJdH28S9yYizPP7yvANqmZtANRfZFU3oYA8bGkpzHVQ/Zwg==",
              "SigningCertUrl": "https://sns.us-east-2.amazonaws.com/SimpleNotificationService-010a507c1833636cd94bdb98bd93083a.pem",
              "UnsubscribeUrl": "https://sns.us-east-2.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-2:058100963274:budget:e2e56949-4ecf-46cd-b5a0-3f62b1e23c0f",
              "MessageAttributes": {}
          }
      }
  ]
};

const guardDutyEvnet = {
  'version': '0', 'id': 'aaf0ade4-32c3-14c3-2a15-f1201abb4a62', 'detail-type': 'GuardDuty Finding', 'source': 'aws.guardduty', 'account': '745060341837', 'time': '2021-08-31T23: 00: 00Z', 'region': 'us-east-1', 'resources': [], 'detail': {
      'schemaVersion': '2.0', 'accountId': '142211754764', 'region': 'us-east-1', 'partition': 'aws', 'id': 'b6bdcf37fc8778b08f218f5da5b32549', 'arn': 'arn:aws:guardduty:us-east-1: 142211754764:detector/8abcb376b60b63bd44083a3896ebd967/finding/b6bdcf37fc8778b08f218f5da5b32549', 'type': 'Policy:S3/BucketAnonymousAccessGranted', 'resource': {
          'resourceType': 'AccessKey', 'accessKeyDetails': {
              'accessKeyId': 'ASIASCHD3FMGLXKFZ54G', 'principalId': 'AROASCHD3FMGPNWNMFKKS:douglas@ahazou.com', 'userType': 'AssumedRole', 'userName': 'AdministratorAccess'
          }, 's3BucketDetails': [
              {
                  'arn': 'arn:aws:s3: : :platform-users', 'name': 'platform-users', 'defaultServerSideEncryption': {
                      'encryptionType': 'AES256', 'kmsMasterKeyArn': "None"
                  }, 'createdAt': 1630450304.0, 'tags': [], 'owner': {
                      'id': 'bd3040b83f75b6a2bcc8f9cf181b7f7c5935e9a5887a4935a04deaf6073b8fa6'
                  }, 'publicAccess': {
                      'permissionConfiguration': {
                          'bucketLevelPermissions': {
                              'accessControlList': {
                                  'allowsPublicReadAccess': "False", 'allowsPublicWriteAccess': "False"
                              }, 'bucketPolicy': {
                                  'allowsPublicReadAccess': "True", 'allowsPublicWriteAccess': "False"
                              }, 'blockPublicAccess': {
                                  'ignorePublicAcls': "False", 'restrictPublicBuckets': "False", 'blockPublicAcls': "False", 'blockPublicPolicy': "False"
                              }
                          }, 'accountLevelPermissions': {
                              'blockPublicAccess': {
                                  'ignorePublicAcls': "False", 'restrictPublicBuckets': "False", 'blockPublicAcls': "False", 'blockPublicPolicy': "False"
                              }
                          }
                      }, 'effectivePermission': 'PUBLIC'
                  }, 'type': 'Destination'
              }
          ]
      }, 'service': {
          'serviceName': 'guardduty', 'detectorId': '8abcb376b60b63bd44083a3896ebd967', 'action': {
              'actionType': 'AWS_API_CALL', 'awsApiCallAction': {
                  'api': 'PutBucketPolicy', 'serviceName': 's3.amazonaws.com', 'callerType': 'Remote IP', 'remoteIpDetails': {
                      'ipAddressV4': '67.202.3.58', 'organization': {
                          'asn': '14618', 'asnOrg': 'AMAZON-AES', 'isp': 'Amazon.com', 'org': 'Amazon.com'
                      }, 'country': {
                          'countryName': 'United States'
                      }, 'city': {
                          'cityName': 'Ashburn'
                      }, 'geoLocation': {
                          'lat': 39.0481, 'lon': -77.4728
                      }
                  }, 'affectedResources': {
                      'AWS: :S3: :Bucket': 'platform-users'
                  }
              }
          }, 'resourceRole': 'TARGET', 'additionalInfo': {}, 'evidence': "None", 'eventFirstSeen': '2021-08-31T22: 52: 14Z', 'eventLastSeen': '2021-08-31T22: 52: 14Z', 'archived': "False", 'count': 1
      }, 'severity': 8, 'createdAt': '2021-08-31T22: 59: 03.566Z', 'updatedAt': '2021-08-31T22: 59: 03.566Z', 'title': 'Amazon S3 Public Anonymous Access was granted for S3 bucket platform-users.', 'description': 'The Amazon S3 bucket platform-users was granted public anonymous access by AdministratorAccess calling PutBucketPolicy. If this behavior is not expected, it may indicate a configuration mistake or that your credentials are compromised.'
  }
}

const ecrEvent = {
  'version': '0',
  'id': '9d9858ca-93fb-0bc0-167f-69a44a8a4741',
  'detail-type': 'ECR Image Scan',
  'source': 'aws.ecr',
  'account': '024917331266',
  'time': '2022-01-05T16:59:16Z',
  'region': 'sa-east-1',
  'resources': ['arn:aws:ecr:sa-east-1:024917331266:repository/cron'],
  'detail': {
      'scan-status': 'COMPLETE',
      'repository-name': 'cron',
      'image-digest': 'sha256:69e160d186ff6ee5ce5324df84ac8f5bb90258271a1804ae673403b4797e52af',
      'image-tags': [],
      'finding-severity-counts': {
          'MEDIUM': 9, 'INFORMATIONAL': 7, 'LOW': 29
      }
  }
};


module.exports = {
alertEvent, budgetEvent, guardDutyEvnet, ecrEvent
}
