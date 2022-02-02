async function GetMessage (event) {
  let msg = []
  switch (event.target) {
    case 'teams':
      msg = [{
        name: 'Alarm Name',
        value: event.AlarmName
      }, {
        name: 'Alarm Description',
        value: event.AlarmDescription
      },
      {
        name: 'Reason',
        value: event.NewStateReason
      },
      {
        name: 'Current Status',
        value: event.NewStateValue
      },
      {
        name: 'Old Status',
        value: event.OldStateValue
      }]
      break

    case 'google':
      msg = {
        header: {
          title: event.AlarmName,
          subtitle: event.AlarmDescription,
          imageUrl: 'https://sinovi.uk/images/articles/cw.png'
        },
        sections: [
          {
            widgets: [
              {
                keyValue: {
                  topLabel: 'Reason',
                  content: event.NewStateReason
                }
              },
              {
                keyValue: {
                  topLabel: 'Current Status',
                  content: event.NewStateValue
                }
              },
              {
                keyValue: {
                  topLabel: 'Old Status',
                  content: event.OldStateValue
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
                      text: 'View in CloudWatch',
                      onClick: {
                        openLink: {
                          url: event.urlAlarm
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
        text: '*AWS CloudWatch Notification*',
        attachments: [
          {
            color: event.color,
            fields: [
              { title: 'Alarm Name', value: event.AlarmName, short: true },
              { title: 'Alarm Description', value: event.AlarmDescription, short: false },
              {
                title: 'Reason',
                value: event.NewStateReason,
                short: false
              },
              { title: 'Old State', value: event.OldStateValue, short: true },
              { title: 'Current State', value: event.NewStateValue, short: true },
              {
                title: 'Link to Alarm',
                value: event.urlAlarm,
                short: false
              }
            ]
            //  ts: timestamp
          }
        ]
      }

      break
  }
  return msg
}

module.exports = { GetMessage }
