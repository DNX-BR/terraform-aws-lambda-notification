const axios = require('axios').default
const format = require('../msgFormats/Alarms')
const templates = require('../templates/Generic')

async function SendMessageTeams (event) {
  const eventMessage = JSON.parse(event.Records[0].Sns.Message)
  const region = event.Records[0].EventSubscriptionArn.split(':')[3]
  eventMessage.region = region
  eventMessage.target = 'teams'

  const card = templates.messageCard

  const msg = await format.GetMessage(eventMessage)

  const urlAlarm = `https://console.aws.amazon.com/cloudwatch/home?region=${region}#alarm:alarmFilter=ANY;name=${encodeURIComponent(msg[0].value)}`

  card.sections[0].activityTitle = event.Records[0].Sns.Subject
  card.sections[0].activitySubtitle = event.Records[0].Sns.Type
  card.themeColor = eventMessage.NewStateValue === 'ALARM' ? 'ab000d' : '00e676'
  card.potentialAction[0].target = [urlAlarm]
  card.sections[0].facts = msg
  try {
    const response = await axios.post(process.env.WEBHOOK_TEAMS, card, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('Erro:', error)
  }
}

async function SendMessageGoogleChat (event) {
  const eventMessage = JSON.parse(event.Records[0].Sns.Message)
  const region = event.Records[0].EventSubscriptionArn.split(':')[3]
  eventMessage.region = region
  eventMessage.target = 'google'

  eventMessage.urlAlarm = `https://console.aws.amazon.com/cloudwatch/home?region=${region}#alarm:alarmFilter=ANY;name=${encodeURIComponent(eventMessage.AlarmName)}`

  const msg = await format.GetMessage(eventMessage)

  const card = templates.messsageCardGoogleChat

  card.cards.push(msg)

  try {
    const response = await axios.post(process.env.WEBHOOK_GOOGLE, card, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response;
  } catch (error) {
    console.error('Erro:', error)
  }
}

async function SendMessageSlack (event) {
  const eventMessage = JSON.parse(event.Records[0].Sns.Message)
  const region = event.Records[0].EventSubscriptionArn.split(':')[3]
  eventMessage.region = region
  eventMessage.target = 'slack'

  eventMessage.urlAlarm = 'https://console.aws.amazon.com/cloudwatch/home?region=' + region + '#alarm:alarmFilter=ANY;name=' + encodeURIComponent(eventMessage.AlarmName)
  eventMessage.color = 'warning'
  if (eventMessage.NewStateValue === 'ALARM') {
    eventMessage.color = 'danger'
  } else {
    eventMessage.color = 'good'
  }

  const msg = await format.GetMessage(eventMessage)
  msg.channel = process.env.SLACK_CHANNEL

  try {
    const response = await axios.post('https://slack.com/api/chat.postMessage', msg, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.SLACK_TOKEN}` }
    });
    return response;
  } catch (error) {
    console.error('Erro:', error)
  }
}

module.exports = { SendMessageTeams, SendMessageGoogleChat, SendMessageSlack }
