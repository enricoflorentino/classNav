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
        conv.close(`Room ${global.room} is to your right before the slight turn in the hall.`)
    }
    else if (global.room >= 1901 && global.room <= 1903) {
        conv.close(`Keep going straight until you can only go right. Room ${global.room} is to your right.`)
    }
    else if (global.room > 1042) {
        conv.ask(`Keep going straight until you can only go right. Let me know when you're there.`)
    }
    else {
        conv.ask(`Take the first right after passing the stairs. Let me know when you've done so.`)
    }
});

app.intent('finalFirstFloor', conv => {
    if (global.room == 1829) {
        conv.close(`Walk all the way to the end of the hall. Room ${global.room} is to your left.`)
    }
})
exports.mybackend = functions.https.onRequest(app);