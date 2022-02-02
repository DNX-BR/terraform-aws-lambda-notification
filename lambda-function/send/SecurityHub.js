const axios = require('axios').default
const format = require('../msgFormats/SecurityHub')
const templates = require('../templates/Generic')

async function SendMessageTeams (event) {
  const region = event.detail.findings[0].Resources[0].Region
  event.target = 'teams'

  const msg = await format.GetMessage(event)
  const card = templates.messageAdaptiveCardTeams
  card.attachments[0].content.actions[0].title = 'View in Console'
  card.attachments[0].content.actions[0].url = `https://console.aws.amazon.com/securityhub/home?region=${region}#/research`
  card.attachments[0].content.body = msg

  try {
    const response = await axios.post(process.env.WEBHOOK_TEAMS, card, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('Error: ',error)
  }
}

async function SendMessageGoogleChat (event) {
  event.target = 'google'

  const msg = await format.GetMessage(event)
  const card = templates.messsageCardGoogleChat
  card.cards.push(msg)

  try {
    const response = await axios.post(process.env.WEBHOOK_GOOGLE, card, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response;
  } catch (error) {
    console.error('Error: ', error)
  }
}

async function SendMessageSlack (event) {
  event.target = 'slack'

  const msg = await format.GetMessage(event)
  msg.channel = process.env.SLACK_CHANNEL

  try {
    const response = await axios.post('https://slack.com/api/chat.postMessage', msg, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.SLACK_TOKEN}` }
    });
    return response;
  } catch (error) {
    console.error('Error: ', error)
  }
}

module.exports = { SendMessageTeams, SendMessageGoogleChat, SendMessageSlack }
