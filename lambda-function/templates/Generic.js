const  messageAdaptiveCardTeams ={
    "type" : "message",
    "attachments" : [{
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard", 
            "body": [],
            "actions": [
                {
                    "type": "Action.OpenUrl",
                    "title": "View Budget Dashboard",
                    "url": "https://console.aws.amazon.com/billing/home?#/budgets"
                }
            ],
            "version": "1.2"
        }
    }]
};

const messageCard = {
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "themeColor": "",
    "summary": "Alertas Cloud Watch",
    "sections": [
        {
            "activityTitle": '',
            "activitySubtitle": '',
            "activityImage": "https://sinovi.uk/images/articles/cw.png",
            "facts": [],
            "markdown": true
        }
    ],
    "potentialAction": [
        {
            "@context": "http://schema.org",
            "@type": "ViewAction",
            "name": "More Information",
            "target": []
        }
    ]
};

const messsageCardGoogleChat = {
    "cards": [

    ]
  }

module.exports = { messageCard, messageAdaptiveCardTeams, messsageCardGoogleChat }