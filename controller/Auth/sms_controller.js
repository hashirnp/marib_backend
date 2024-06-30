const { sendResponseError } = require('../../middleware/auth_middileware');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendMessege = async (number, messege) => {
    try {
        client.messages
        .create({
            body: messege,
            from: process.env.TWILIO_PHONE,
            to: "+" + number,
        })
        .then(message => console.log(message.sid))
    } catch (error) {
        console.log(error);
    }
    // .done();
}

module.exports = { sendMessege }