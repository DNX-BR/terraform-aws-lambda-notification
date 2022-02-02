async function GetMessage (event) {
  let msg = []
  switch (event.target) {
    case 'teams':
      msg = [
        {
          type: 'TextBlock',
          size: 'Medium',
          weight: 'Bolder',
          text: event.line[0]
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
                  url: 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/aws-pricing-models-and-support/discover-the-aws-cost-management-tools/images/772fa4bfbbcdfdba154d61ff07845675_6-d-0-bf-664-3-d-02-4-ab-4-acd-4-da-095-d-1-e-1-ffe.png',
                  size: 'Small'
                }
              ],
              width: 'auto'
            },
            {
              type: 'Column',
              items: [
                {
                  type: 'TextBlock',
                  weight: 'Bolder',
                  text: event.line[1],
                  wrap: true
                }
              ],
              width: 'stretch'
            }
          ]
        },
        {
          type: 'TextBlock',
          text: event.line[5],
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
                      title: 'Budget Name',
                      value: event.line[7].split(':')[1]
                    }
                  ]
                },
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'Budgeted Amount',
                      value: event.line[9].split(':')[1]
                    }
                  ]
                },
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'Alert Threshold',
                      value: event.line[11].split(':')[1]
                    }
                  ]
                }
              ]
            },
            {
              type: 'Column',
              width: 'stretch',
              items: [
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'Buget Type',
                      value: event.line[8].split(':')[1]
                    }
                  ]
                },
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'Alert Type',
                      value: event.line[10].split(':')[1]
                    }
                  ]
                },
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'ACTUAL Amount',
                      value: event.line[12].split(':')[1]
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
          title: event.line[0],
          subtitle: event.line[1],
          imageUrl: 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/aws-pricing-models-and-support/discover-the-aws-cost-management-tools/images/772fa4bfbbcdfdba154d61ff07845675_6-d-0-bf-664-3-d-02-4-ab-4-acd-4-da-095-d-1-e-1-ffe.png'
        },
        sections: [
          {
            widgets: [
              {
                keyValue: {
                  topLabel: 'Message',
                  content: event.line[5],
                  contentMultiline: true
                }
              },
              {
                keyValue: {
                  topLabel: 'Budget Name',
                  content: event.line[7].split(':')[1],
                  icon: 'DESCRIPTION'
                }
              },
              {
                keyValue: {
                  topLabel: 'Budget Type',
                  content: event.line[8].split(':')[1],
                  icon: 'DESCRIPTION'
                }
              },
              {
                keyValue: {
                  topLabel: 'Budgeted Amount',
                  content: event.line[9].split(':')[1],
                  icon: 'DOLLAR'
                }
              },
              {
                keyValue: {
                  topLabel: 'Alert Type',
                  content: event.line[10].split(':')[1],
                  icon: 'DESCRIPTION'
                }
              },
              {
                keyValue: {
                  topLabel: 'Alert Threshold',
                  content: event.line[11].split(':')[1],
                  icon: 'DOLLAR'
                }
              },
              {
                keyValue: {
                  topLabel: 'ACTUAL Amount',
                  content: event.line[12].split(':')[1],
                  icon: 'DOLLAR'
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
                      text: 'View in AWS Budgets Dashboard',
                      onClick: {
                        openLink: {
                          url: 'https://console.aws.amazon.com/billing/home#/budgets'
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
            color: '#008000',
            blocks: [
              {
                type: 'header',
                text: {
                  type: 'plain_text',
                  text: event.line[0],
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
                  text: event.line[5],
                  emoji: true
                }
              },
              {
                type: 'section',
                fields: [
                  {
                    type: 'mrkdwn',
                    text: `*Budget Name*: ${event.line[7].split(':')[1]}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*Budget Type*: ${event.line[8].split(':')[1]}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*Budgeted Amount*: ${event.line[9].split(':')[1]}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*Alert Type*: ${event.line[10].split(':')[1]}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*Alert Thresholdt*: ${event.line[11].split(':')[1]}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*ACTUAL Amount*: ${event.line[12].split(':')[1]}`
                  }
                ]
              },
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: `*${event.line[1]}*`
                },
                accessory: {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: 'View in Budget Dashboard',
                    emoji: true
                  },
                  value: 'click_me_123',
                  url: 'https://console.aws.amazon.com/billing/home#/budgets',
                  action_id: 'button-action'
                }
              }
            ]
          }
        ]
      }
      break
  }
  return msg
}

module.exports = { GetMessage }
