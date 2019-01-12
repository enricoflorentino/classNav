const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');

const app = dialogflow();

app.intent('nextIntent', conv => {
    
    conv.close('CLASSNAV');
});

exports.mybackend = functions.https.onRequest(app);