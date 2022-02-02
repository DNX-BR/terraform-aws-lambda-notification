const ecr = require('./send/ECR');
const alarm = require('./send/Alarms')
const budget = require('./send/Budget')
const guard = require('./send/GuardDuty')
const samples = require('./samples')

it('Send Alarm Teams', async () => {
    expect.assertions(1);
    const response = await alarm.SendMessageTeams(samples.alertEvent);
    expect(response.status).toEqual(200);
});

it('Send Alarm Google', async () => {
    expect.assertions(1);
    const response = await alarm.SendMessageGoogleChat(samples.alertEvent);
    expect(response.status).toEqual(200);
});

it('Send Alarm Slack', async () => {
    expect.assertions(1);
    const response = await alarm.SendMessageSlack(samples.alertEvent);
    expect(response.status).toEqual(200);
});

/***********************************************************************************/

it('Send ECR Teams', async () => {
    expect.assertions(1);
    const response = await ecr.SendMessageTeams(samples.ecrEvent);
    expect(response.status).toEqual(200);
});

it('Send ECR Google', async () => {
    expect.assertions(1);
    const response = await ecr.SendMessageGoogleChat(samples.ecrEvent);
    expect(response.status).toEqual(200);
});

it('Send ECR Slack', async () => {
    expect.assertions(1);
    const response = await ecr.SendMessageSlack(samples.ecrEvent);
    expect(response.status).toEqual(200);
});

/***********************************************************************************/

it('Send Budget Teams', async () => {
    expect.assertions(1);
    const response = await budget.SendMessageTeams(samples.budgetEvent);
    expect(response.status).toEqual(200);
});

it('Send Budget Google', async () => {
    expect.assertions(1);
    const response = await budget.SendMessageGoogleChat(samples.budgetEvent);
    expect(response.status).toEqual(200);
});

it('Send Budget Slack', async () => {
    expect.assertions(1);
    const response = await budget.SendMessageSlack(samples.budgetEvent);
    expect(response.status).toEqual(200);
});

/***********************************************************************************/

it('Send Guard Duty Teams', async () => {
    expect.assertions(1);
    const response = await guard.SendMessageTeams(samples.guardDutyEvnet);
    expect(response.status).toEqual(200);
});

it('Send Guard Duty Google', async () => {
    expect.assertions(1);
    const response = await guard.SendMessageGoogleChat(samples.guardDutyEvnet);
    expect(response.status).toEqual(200);
});

it('Send Guard Duty Slack', async () => {
    expect.assertions(1);
    const response = await guard.SendMessageSlack(samples.guardDutyEvnet);
    expect(response.status).toEqual(200);
});

