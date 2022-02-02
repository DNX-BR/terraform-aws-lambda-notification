const axios = require('axios').default

async function createTicketAlarm (msg) {
  const clientName = process.env.CLIENT_NAME
  const clientEmail = process.env.CLIENT_EMAIL

  const ticket = {
    alert: true,
    autorespond: true,
    source: 'API',
    name: clientName,
    email: clientEmail,
    subject: msg.AlarmName,
    message: msg.NewStateReason,
    topicId: 15,
    AlarmDescription: msg.AlarmDescription,
    AWSAccountId: 999999999999,
    Reason: `Old Status: ${msg.OldStateValue}; Current Status: ${msg.NewStateValue}`,
    Region: msg.region
  }
  await axios.post('https://suporte.dnxbrasil.com.br/api/tickets.json', ticket, {
    headers: {
      'Content-Type': 'application/json', 'X-API-Key': process.env.OSTICKET_API_KEY
    }
  })
}

module.exports = { createTicketAlarm }
