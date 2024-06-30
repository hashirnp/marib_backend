const axios = require('axios');

async function sendSMS(number, messege) {
    
    const numbers = number; // enter Mobile numbers comma separated
    const api_id = process.env.SMS_API;
    const senderid = "SMSBIT"; // Your sender id
    const mess = messege;
    const message = encodeURIComponent(mess);
    const port = "TA"; // required route

    const url = `https://app.smsbits.in/api/web?id=${api_id}&senderid=${senderid}&to=${numbers}&msg=${message}&port=${port}`;

    try {
        const response = await axios.get(url);
        console.log(response);
    } catch (error) {
        console.error("Error:", error.response.data);
    }
}

module.exports = { sendSMS }
