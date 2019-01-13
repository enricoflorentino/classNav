const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');

const app = dialogflow();

// global variable to store desired room throughout destination
global.room = 1000;

app.intent('startRoute', (conv, {number}) => {

    // number arg is the desired room #

    global.room = number;
    if (number/1000 < 2) {
        // first floor
        if (number == 1012) {
            conv.close(`Walk slightly to the right, room ${number} is up ahead.`);
        } else {
            conv.ask("Walk past the stairs that are ahead of you. Let me know when you're there.");    
        }
        
    } 
     
});


app.intent('firstFloorRooms', conv => {
    if (global.room == 1013) {
        conv.close(``)
    }
});
exports.mybackend = functions.https.onRequest(app);