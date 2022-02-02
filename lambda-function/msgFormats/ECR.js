async function GetColorSeverity (severity) {
  let color
  if (severity.CRITICAL) {
    color = '#df3311'
  } else if (severity.HIGH) {
    color = '#ef7311'
  } else if (severity.MEDIUM) {
    color = '#686868'
  } else if (severity.LOW) {
    color = '#909090'
  } else if (severity.INFORMAL) {
    color = '#b8b8b8'
  } else {
    color = '#e0e0e0'
  }
  return color
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
          text: 'AmazonECR Image Scan Findings Description'
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
                  url: 'https://raw.githubusercontent.com/awslabs/aws-icons-for-plantuml/main/dist/Containers/ElasticContainerRegistry.png',
                  size: 'Small'
                }
              ],
              width: 'auto'
            }
          ]
        },
        {
          type: 'TextBlock',
          text: `ECR Image Scan findings ${event.region} Account ${event.account}`,
          wrap: true
        },
        {
          type: 'TextBlock',
          text: event.detail['scan-status'],
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
                      title: 'Repository Name',
                      value: event.detail['repository-name']
                    }
                  ]
                },
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'CRITICAL',
                      value: event.detail['finding-severity-counts'].CRITICAL ? event.detail['finding-severity-counts'].CRITICAL : 0
                    }
                  ]
                },
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'HIGH',
                      value: event.detail['finding-severity-counts'].HIGH ? event.detail['finding-severity-counts'].HIGH : 0
                    }
                  ]
                },
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'MEDIUM',
                      value: event.detail['finding-severity-counts'].MEDIUM ? event.detail['finding-severity-counts'].MEDIUM : 0
                    }
                  ]
                },
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'LOW',
                      value: event.detail['finding-severity-counts'].LOW ? event.detail['finding-severity-counts'].LOW : 0
                    }
                  ]
                },
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'INFORMAL',
                      value: event.detail['finding-severity-counts'].INFORMAL ? event.detail['finding-severity-counts'].INFORMAL : 0
                    }
                  ]
                },
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'UNDEFINED',
                      value: event.detail['finding-severity-counts'].UNDEFINED ? event.detail['finding-severity-counts'].UNDEFINED : 0
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
          title: 'AmazonECR Image Scan Findings Description',
          imageUrl: 'https://raw.githubusercontent.com/awslabs/aws-icons-for-plantuml/main/dist/Containers/ElasticContainerRegistry.png'
        },
        sections: [
          {
            widgets: [
              {
                keyValue: {
                  topLabel: 'Repository Name',
                  content: event.detail['repository-name'],
                  contentMultiline: true
                }
              },
              {
                keyValue: {
                  topLabel: 'Description',
                  content: `ECR Image Scan findings ${event.region} Account ${event.account}`,
                  contentMultiline: true
                }
              },
              {
                keyValue: {
                  topLabel: 'Status',
                  content: event.detail['scan-status'],
                  icon: 'DESCRIPTION'
                }
              },
              {
                keyValue: {
                  topLabel: 'CRITICAL',
                  content: event.detail['finding-severity-counts'].CRITICAL ? `${event.detail['finding-severity-counts'].CRITICAL}` : '0',
                  icon: 'DESCRIPTION'
                }
              },
              {
                keyValue: {
                  topLabel: 'HIGH',
                  content: event.detail['finding-severity-counts'].HIGH ? `${event.detail['finding-severity-counts'].HIGH}` : '0',
                  icon: 'DESCRIPTION'
                }
              },
              {
                keyValue: {
                  topLabel: 'MEDIUM',
                  content: event.detail['finding-severity-counts'].MEDIUM ? `${event.detail['finding-severity-counts'].MEDIUM}` : '0',
                  icon: 'DESCRIPTION'
                }
              },
              {
                keyValue: {
                  topLabel: 'LOW',
                  content: event.detail['finding-severity-counts'].LOW ? `${event.detail['finding-severity-counts'].LOW}` : '0',
                  icon: 'DESCRIPTION'
                }
              },
              {
                keyValue: {
                  topLabel: 'INFORMAL',
                  content: event.detail['finding-severity-counts'].INFORMAL ? `${event.detail['finding-severity-counts'].INFORMAL}` : '0',
                  icon: 'DESCRIPTION'
                }
              },
              {
                keyValue: {
                  topLabel: 'UNDEFINED',
                  content: event.detail['finding-severity-counts'].UNDEFINED ? `${event.detail['finding-severity-counts'].UNDEFINED}` : '0',
                  icon: 'DESCRIPTION'
                }
              }
            ]
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
                          url: `https://${event.region}.console.aws.amazon.com/ecr/repositories/private/${event.account}/${event.detail['repository-name']}/image/${event.detail['image-digest']}/scan-results/?region=${event.region}`
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
            color: await GetColorSeverity(event.detail['finding-severity-counts']),
            blocks: [
              {
                type: 'header',
                text: {
                  type: 'plain_text',
                  text: 'AmazonECR Image Scan Findings Description',
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
                  text: `ECR Image Scan findings ${event.region} Account ${event.account}`,
                  emoji: true
                }
              },
              {
                type: 'section',
                fields: [
                  {
                    type: 'mrkdwn',
                    text: `*Repository Name*: ${event.detail['repository-name']} `
                  },
                  {
                    type: 'mrkdwn',
                    text: `*Status*: ${event.detail['scan-status']}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*CRITICAL*: ${event.detail['finding-severity-counts'].CRITICAL ? event.detail['finding-severity-counts'].CRITICAL : 0}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*HIGH*: ${event.detail['finding-severity-counts'].HIGH ? event.detail['finding-severity-counts'].HIGH : 0}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*MEDIUM*: ${event.detail['finding-severity-counts'].MEDIUM ? event.detail['finding-severity-counts'].MEDIUM : 0}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*LOW*: ${event.detail['finding-severity-counts'].LOW ? event.detail['finding-severity-counts'].LOW : 0}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*INFORMAL*: ${event.detail['finding-severity-counts'].INFORMAL ? event.detail['finding-severity-counts'].INFORMAL : 0}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*UNDEFINED*: ${event.detail['finding-severity-counts'].CRITICAL ? event.detail['finding-severity-counts'].UNDEFINED : 0}`
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
                    url: `https://${event.region}.console.aws.amazon.com/ecr/repositories/private/${event.account}/${event.detail['repository-name']}/image/${event.detail['image-digest']}/scan-results/?region=${event.region}`
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

/*

                            {
                                "type": "divider"
                            },
                            {
                                "type": "section",
                                "fields": [
                                    {
                                        "type": "mrkdwn",
                                        "text": `*View in Console*: https://${event.region}.console.aws.amazon.com/ecr/repositories/private/${event.account}/${event.detail["repository-name"]}/image/${event.detail["image-digest"]}/scan-results/?region=${event.region}`
                                    },
                                ]
                            }

*/
