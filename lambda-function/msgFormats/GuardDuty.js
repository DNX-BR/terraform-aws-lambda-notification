async function GetMessage (event) {
  let msg = []
  switch (event.target) {
    case 'teams':
      msg = [
        {
          type: 'TextBlock',
          size: 'Medium',
          weight: 'Bolder',
          text: 'GuardDuty Finding'
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
                  url: 'https://www.checkpoint.com/wp-content/uploads/amazon-guardduty-icon-text.png',
                  size: 'Small'
                }
              ],
              width: 'auto'
            }
          ]
        },
        {
          type: 'TextBlock',
          text: event.detail.description,
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
                      title: 'Region',
                      value: event.region
                    }
                  ]
                },
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'Finding Type',
                      value: event.detail.type
                    }
                  ]
                },
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'Event First Seen',
                      value: event.detail.service.eventFirstSeen
                    }
                  ]
                },
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'Event Last Seen',
                      value: event.detail.service.eventLastSeen
                    }
                  ]
                },
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'Severity',
                      value: event.detail.severity
                    }
                  ]
                },
                {
                  type: 'FactSet',
                  facts: [
                    {
                      title: 'Count',
                      value: event.detail.service.count
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
          title: 'GuardDuty Finding',
          imageUrl: 'https://www.checkpoint.com/wp-content/uploads/amazon-guardduty-icon-text.png'
        },
        sections: [
          {
            widgets: [
              {
                keyValue: {
                  topLabel: 'Description',
                  content: event.detail.description,
                  contentMultiline: true
                }
              },
              {
                keyValue: {
                  topLabel: 'Region',
                  content: event.region,
                  icon: 'DESCRIPTION'
                }
              },
              {
                keyValue: {
                  topLabel: 'Finding Type',
                  content: event.detail.type,
                  icon: 'DESCRIPTION'
                }
              },
              {
                keyValue: {
                  topLabel: 'Event First Seen',
                  content: event.detail.service.eventFirstSeen,
                  icon: 'DESCRIPTION'
                }
              },
              {
                keyValue: {
                  topLabel: 'Event Last Seen',
                  content: event.detail.service.eventLastSeen,
                  icon: 'DESCRIPTION'
                }
              },
              {
                keyValue: {
                  topLabel: 'Severity',
                  content: event.detail.severity.toString(),
                  icon: 'DESCRIPTION'
                }
              },
              {
                keyValue: {
                  topLabel: 'Count',
                  content: event.detail.service.count.toString(),
                  icon: 'DESCRIPTION'
                }
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
            color: '#FF0000',
            blocks: [
              {
                type: 'header',
                text: {
                  type: 'plain_text',
                  text: 'GuardDuty Finding',
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
                  text: event.detail.description,
                  emoji: true
                }
              },
              {
                type: 'section',
                fields: [
                  {
                    type: 'mrkdwn',
                    text: `*Region*: ${event.region}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*Finding Type*: ${event.detail.type}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*Event First Seen*: ${event.detail.service.eventFirstSeen}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*Event Last Seen*: ${event.detail.service.eventLastSeen}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*Severity*: ${event.detail.severity}`
                  },
                  {
                    type: 'mrkdwn',
                    text: `*Count*: ${event.detail.service.count}`
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
