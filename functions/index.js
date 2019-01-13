const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');

// DISCLAIMER: code below shows responses based on Dialogflow's branches/pathways
const app = dialogflow();

// global variable to store desired room throughout destination
global.room = 1000;

app.intent('startRoute1', conv => {
     conv.ask(`Ok! Your class is on floor 1, tell me your exact room number.`)
});

app.intent(`startRoute2`, conv => {
    conv.ask(`Ok! Your class is on floor 2, tell me your exact room number.`)
});

app.intent(`startRoute3`, conv => {
    conv.ask(`Ok! Your class is on floor 3, tell me your exact room number.`)
});

app.intent(`startRoute4`, conv => {
    conv.ask(`Ok! Your class is on floor 4, tell me your exact room number.`)
});

app.intent(`startRoute5`, conv => {
    conv.ask(`Ok! Your class is on floor 5, tell me your exact room number.`)
});

app.intent('firstFloor', (conv, {number}) => {
    // number arg is the desired room #
    global.room = number;
    if (number/1000 < 2) {
        // first floor
        if (number == 1012) {
            conv.close(`Ok! Walk slightly to the right, room ${number} is up ahead.`);
        } else {
            conv.ask("Ok! Walk past the stairs that are ahead of you. Let me know when you're there.");    
        }
        
    } 
});

app.intent('firstFloorFollowUp', conv => {
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

app.intent('firstFloorFollowUp2', conv => {
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
});

app.intent(`secondFloor`, (conv, {number}) => {
    global.room = number;
    if (number/1000 >= 2 && number/1000 < 3) {
        // second floor
        conv.ask(`Ok! Walk up the stairs that are ahead of you to enter the second floor. Let me know when you've done so.`)
    } 
});

app.intent(`secondFloorFollowUp`, conv => {
    conv.close(`After the door, turn left then right and go straight down the hallway. Let me know when you've done so.`)
});

app.intent(`secondFloorFollowUp2`, conv => {
    if (global.room == 2062 || global.room == 2066) {
        conv.close(`Near the end of the hall past the high tables on your left, take the last right to a hallway. Room
        ${global.room} is to your close right.`)
    }
    else if (global.room == 2058 || global.room == 2002) {
        conv.close(`Near the end of the hall past the high tables on your left, take the last right to a hallway. Room
        ${global.room} is to your close left.`)
    }
});

exports.mybackend = functions.https.onRequest(app);