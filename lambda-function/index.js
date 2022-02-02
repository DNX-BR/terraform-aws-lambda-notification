const alarms = require('./send/Alarms');
const budget = require('./send/Budget');
const guard = require('./send/GuardDuty');
const security = require('./send/SecurityHub')
const ecr = require('./send/ECR');

exports.handler = async (event) => {

    if (process.env.PRINT_EVENT)
        console.log(JSON.stringify(event))

    const snsTopicNameAlarm = process.env.SNS_TOPIC_NAME_ALARM;
    const snsTopicNameAlarmCSI = process.env.SNS_TOPIC_NAME_ALARM_CSI;

    if (event.Records) {
        //Alarms
        if (event.Records[0].EventSubscriptionArn.split(":")[5] === snsTopicNameAlarm || event.Records[0].EventSubscriptionArn.split(":")[5] === snsTopicNameAlarmCSI) {
            if (process.env.ENDPOINT_TYPE === 'teams') {
                await alarms.SendMessageTeams(event)
            } else if (process.env.ENDPOINT_TYPE === 'google') {
                await alarms.SendMessageGoogleChat(event);
            } else {
                await alarms.SendMessageSlack(event);
            }
            //Budget
        } else {
            if (process.env.ENDPOINT_TYPE === 'teams') {
                await budget.SendMessageTeams(event)
            } else if (process.env.ENDPOINT_TYPE === 'google') {
                await budget.SendMessageGoogleChat(event);
            } else {
                await budget.SendMessageSlack(event);
            }
        }
    }

    if (event.detail) {
        //Guard Duty
        if (event.source === 'aws.guardduty') {
            if (process.env.ENDPOINT_TYPE === 'teams') {
                await guard.SendMessageTeams(event)
            } else if (process.env.ENDPOINT_TYPE === 'google') {
                await guard.SendMessageGoogleChat(event);
            } else {
                await guard.SendMessageSlack(event);
            }
        }
        else if (event.source === 'aws.ecr') {
            if (process.env.ENDPOINT_TYPE === 'teams') {
                await ecr.SendMessageTeams(event)
            } else if (process.env.ENDPOINT_TYPE === 'google') {
                await ecr.SendMessageGoogleChat(event);
            } else {
                await ecr.SendMessageSlack(event);
            }
        } else {
            //Security Hub
            if (process.env.ENDPOINT_TYPE === 'teams') {
                await security.SendMessageTeams(event)
            } else if (process.env.ENDPOINT_TYPE === 'google') {
                await security.SendMessageGoogleChat(event);
            } else {
                await security.SendMessageSlack(event);
            }

        }
    }

}    
