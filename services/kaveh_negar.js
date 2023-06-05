const API_KEY = process.env.KAVEH_NEGAR_API_KEY;
const Kavenegar = require('kavenegar');
const handleBars = require('handlebars');
const messages = require('../config/message.json');

const api = Kavenegar.KavenegarApi({
    apikey: API_KEY
});

const sendSMS = async (receptor, full_name) => {
    try {
        const template = handleBars.compile(messages.sms);
        const message = template({ full_name });
        
        api.Send({
            message: message,
            receptor,
            ...(process.env.KAVEH_NEGAR_SENDER_NUMBER && process.env.KAVEH_NEGAR_SENDER_NUMBER)
        },
            function(response, status) {
                console.log(response);
                console.log(status);
                if (status === 200) {
                    console.log('Message Sent Successfully!')
                    return true;
                } else {
                    console.log('Message Sent Failed!')
                    return false;
                }
        });
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

module.exports = {
    sendSMS
}
