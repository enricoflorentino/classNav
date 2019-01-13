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


app.intent('firstFloor', conv => {
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

app.intent('firstFloorFollowUp', conv => {
    if (global.room == 1829 || global.room == 1907) {
        conv.close(`Walk all the way to the end of the hall. Room ${global.room} is to your left.`)
    }
    else if (global.room == 1908) {
        conv.close(`Walk all the way to the end of the hall. Room ${global.room} is to your right.`)
    }
    else if (global.room == 1019) {
        conv.close(`Room ${global.room} is on your left side.`)
    }
    else if (global.room == 1024 ) {
        conv.close(`Take the left after the end of the hall. Room ${global.room} is to your left.`)
    }
    else if (global.room % 2 == 1) {
        conv.close(`Take the left after the end of the hall. Room ${global.room} is to your left after the door.`)
    }
    else {
        conv.close(`Take the left after the end of the hall. Room ${global.room} is to your right after the door.`)
    }
})
exports.mybackend = functions.https.onRequest(app);