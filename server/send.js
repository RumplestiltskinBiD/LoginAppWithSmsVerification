const {Vonage} = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: "4f2bcc6e",
    apiSecret: "aiZ4ndd0IuOrCCPZ"
})

const from = "Vonage APIs"
const text = 'Your code is 111111'

async function sendSMS(to) {
    await vonage.sms.send({ to, from, text })
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => {
            console.log('There was an error sending the messages.'); console.error(err);
            console.log(err.response.messages)
        });
}

module.exports = sendSMS;