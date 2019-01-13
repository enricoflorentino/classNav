const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');

const app = dialogflow();

app.intent('startRoute', (conv, {number}) => {
    if (number == 231) {
        conv.close(`WHAT 231! You said ${number}`);
    } else {
        conv.close(`GO WHEREVER! You said ${number}`);
    }
});

exports.mybackend = functions.https.onRequest(app);