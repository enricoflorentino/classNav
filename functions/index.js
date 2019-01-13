const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');

const app = dialogflow();

app.intent('startRoute', (conv, {number}) => {

    // number arg is the desired room #
   
    if (number/1000 < 2) {
        // first floor
        if (number == 1012) {
            conv.close(`Walk slightly to the right, room ${number} is up ahead.`);
        } else {
            conv.ask("Walk past the stairs that are ahead of you. Let me know when you're there.");    
        }

    } 
     
});


app.intent('firstFloorRooms', (conv, {number}) => {
    
    conv.close(`Congrats`);
});
exports.mybackend = functions.https.onRequest(app);