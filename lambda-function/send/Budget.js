const axios = require('axios').default
const format = require('../msgFormats/Budget')
const templates = require('../templates/Generic')

async function SendMessageTeams (event) {
  const eventMessage = event.Records[0].Sns.Message
  const linesMessage = eventMessage.split('\n')
  const messageJson = { line: linesMessage, target: 'teams' }

  const msg = await format.GetMessage(messageJson)
  const card = templates.messageAdaptiveCardTeams
  card.attachments[0].content.body = msg


  try {
    const response = await axios.post(process.env.WEBHOOK_TEAMS, card, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error(error)
  }
}

async function SendMessageGoogleChat (event) {
  const eventMessage = event.Records[0].Sns.Message
  const linesMessage = eventMessage.split('\n')
  const messageJson = { line: linesMessage, target: 'google' }

  const msg = await format.GetMessage(messageJson)

  const card = templates.messsageCardGoogleChat

  card.cards.push(msg)

  try {
    const response = await axios.post(process.env.WEBHOOK_GOOGLE, card, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response;
  } catch (error) {
    console.error('error:', error)
  }
}

async function SendMessageSlack (event) {
  const eventMessage = event.Records[0].Sns.Message
  const linesMessage = eventMessage.split('\n')
  const messageJson = { line: linesMessage, target: 'slack' }

  const msg = await format.GetMessage(messageJson)

  msg.channel = process.env.SLACK_CHANNEL

  try {
    const response = await axios.post('https://slack.com/api/chat.postMessage', msg, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.SLACK_TOKEN}` }
    });
    return response;
  } catch (error) {
    console.error('ewrror: ', error)
  }
}

module.exports = {
  SendMessageTeams, SendMessageGoogleChat, SendMessageSlack
}
