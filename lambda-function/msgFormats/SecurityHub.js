async function GetSeverity (sev) {
  let severity = ''
  let color = ''

  if (sev >= 1 && sev <= 39) {
    severity = 'LOW'; color = '#879596'
  } else if (sev >= 40 && sev <= 69) {
    severity = 'MEDIUM'; color = '#ed7211'
  } else if (sev >= 70 && sev <= 89) {
    severity = 'HIGH'; color = '#ed7211'
  } else if (sev >= 90 && sev <= 100) {
    severity = 'CRITICAL'; color = '#ff0209'
  } else {
    severity = 'INFORMATIONAL'; color = '#007cbc'
  }

  return {
    severity,
    color
  }
}

async function GetMessage (event) {
  let msg = []
  switch (event.target) {
    case 'teams':
      msg = [
        {
          type: 'TextBlock',
          size: 'Medium',
          weight: 'Bolder',
          text: event.detail.findings[0].Types[0]
        },
        {
          type: 'ColumnSet',
          columns: [
            {
              type: 'Column',
              items: [
                {
                  type: 'Image',
                  style: 'Person',
                  url: 'https://raw.githubusercontent.com/aws-samples/amazon-securityhub-to-slack/master/images/gd_logo.png',
                  size: 'Small'
                }
              ],
              width: 'auto'
            }
          ]
        },
        {
          type: 'TextBlock',
          text: `AWS SecurityHub finding in ${event.detail.findings[0].Resources[0].Region} for Acct: ${event.detail.findings[0].AwsAccountId}`,
          wrap: true
        },
        {
          type: 'TextBlock',
          text: event.detail.findings[0].Description,
          wrap: true
        },
        {
          type: 'ColumnSet',
          columns: [
            {
              type: 'Column',
              width: 'stretch',
              items: [
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'Severity',
                      value: (await GetSeverity(event.detail.findings[0].Severity.Normalized)).severity
                    }
                  ]
                },
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'Region',
                      value: event.detail.findings[0].Resources[0].Region
                    }
                  ]
                },
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'Resource Type',
                      value: event.detail.findings[0].Resources[0].Type
                    }
                  ]
                }
              ]
            }
          ]
        }]
      break

    case 'google':
      msg = {
        header: {
          title: event.detail.findings[0].Types[0],
          subtitle: `AWS SecurityHub finding in ${event.detail.findings[0].Resources[0].Region} for Acct: ${event.detail.findings[0].AwsAccountId}`,
          imageUrl: 'https://raw.githubusercontent.com/aws-samples/amazon-securityhub-to-slack/master/images/gd_logo.png'
        },
        sections: [
          {
            widgets: [
              {
                keyValue: {
                  topLabel: 'Description',
                  content: event.detail.findings[0].Description,
                  contentMultiline: true
                }
              },
              {
                keyValue: {
                  topLabel: 'Severity',
                  content: (await GetSeverity(event.detail.findings[0].Severity.Normalized)).severity,
                  icon: 'DESCRIPTION'
                }
              },
              {
                keyValue: {
                  topLabel: 'Region',
                  content: event.detail.findings[0].Resources[0].Region,
                  icon: 'DESCRIPTION'
                }
              },
              {
                keyValue: {
                  topLabel: 'Resource Type',
                  content: event.detail.findings[0].Resources[0].Type,
                  icon: 'DESCRIPTION'
                }
              }]
          },
          {
            widgets: [
              {
                buttons: [
                  {
                    textButton: {
                      text: 'View in Console',
                      onClick: {
                        openLink: {
                          url: `https://console.aws.amazon.com/securityhub/home?region=${event.detail.findings[0].Resources[0].Region}#/research`
                        }
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
      break

    case 'slack':
      msg = {
        attachments: [
          {
            color: (await GetSeverity(event.detail.findings[0].Severity.Normalized)).color,
            blocks: [
              {
                type: 'header',
                text: {
                  type: 'plain_text',
                  text: event.detail.findings[0].Types[0],
                  emoji: true
                }
              },
              {
                type: 'divider'
              },
              {
                type: 'section',
                text: {
                  type: 'plain_text',
                  text: event.detail.findings[0].Description,
                  emoji: true
                }
              },
              {
                type: 'section',
                fields: [
                  {
                    type: 'mrkdwn',
                    text: `*Info*: AWS SecurityHub finding in ${event.detail.findings[0].Resources[0].Region} for Acct: ${event.detail.findings[0].AwsAccountId}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*Severity*: ${(await GetSeverity(event.detail.findings[0].Severity.Normalized)).severity}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*Region*: ${event.detail.findings[0].Resources[0].Region}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*Resource Type*: ${event.detail.findings[0].Resources[0].Type}`
                  }
                ]
              },
              {
                type: 'actions',
                elements: [
                  {
                    type: 'button',
                    text: {
                      type: 'plain_text',
                      text: 'View in Console',
                      emoji: true
                    },
                    value: 'console',
                    url: `https://console.aws.amazon.com/securityhub/home?region=${event.detail.findings[0].Resources[0].Region}#/research`
                  }
                ]
              }
            ]
          }
        ]
      }
      break
  }
  return msg
}

module.exports = {
  GetMessage
}
