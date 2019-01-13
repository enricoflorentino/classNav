const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');

// DISCLAIMER: code below shows responses based on Dialogflow's branches/pathways
const app = dialogflow();

// global variable to store desired room throughout destination
global.room = 1000;

app.intent('startRoute0', conv => {
    conv.ask('Ok! Your class is in the basement, tell me your exact room number');
})
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

app.intent('zerothFloor', (conv, {number}) => {
    global.room = number;
    if (number < 1000) {
        conv.ask(`Walk straight down the stairs in front of you leading to the lower level, proceed for two flights. Let me
        know when you've reach the bottom.`);
    }
});

app.intent('zerothFloorFollowUp', conv => {
    if (global.room == 60 || global.room == 64) {
        conv.close(`${global.room} should just be up ahead.`);
    } else if (global.room == 50) {
        conv.close(`${global.room} should just be up ahead, slightly to the right.`);
    } else if (global.room == 40 || global.room == 20 || global.room == 32 || global.room == 34 || global.room == 36) {
        conv.close(`Turn right and ${global.room} should be against the wall up ahead`);
    } else {
        conv.close(`Turn right and ${global.room} should be against the wall up ahead`);
    }
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
    if (global.room == 2903 || global.room ==  2902) {
        conv.close(`After the door, turn left then right then the first left is where ${global.room}`);
    } else if(global.room == 2062 || global.room == 2066 || global.room == 2058 || global.room == 2002) {
        conv.ask(`After the door, turn left then right and go straight down the hallway. Let me know when you've done so.`)
    } else {
        conv.ask(`After the door, turn right onto the long stretched hallway and let me know when you reach the end of it.`);
    }
    
});

app.intent(`secondFloorFollowUp2`, conv => {
    if (global.room == 2062 || global.room == 2066) {
        conv.close(`Near the end of the hall past the high tables on your left, take the last right to a hallway. Room
        ${global.room} is to your close right.`)
    }
    else if (global.room == 2058 || global.room == 2002) {
        conv.close(`Near the end of the hall past the high tables on your left, take the last right to a hallway. Room
        ${global.room} is to your close left.`)
    } else if (global.room == 2031) {
        conv.close(`${global.room} is just to your left.`);
    } else if (global.room >= 2018 && global.room <= 2026) {
        conv.close(`Enter the room to your left, and your ${global.room} is on your left.`);
    } else if (global.room > 2026 && global.room <= 2042) {
        conv.close(`Enter the room to your left, and ${global.room} should be straight ahead, past the reception desk`);
    } else {
        conv.close(`Enter the room to your left, and ${global.room} should be straight ahead, past the reception desk, and a short
        walk down the hallway`);
    }
});

app.intent(`thirdFloor`, (conv, {number}) => {
    global.room = number;
    if (number/1000 >= 3 && number/1000 < 4) {
        // third floor
        conv.ask(`Ok! Walk past the stairs ahead of you and instead take the stairs beside the elevator to floor three.
                    Let me know when you've done so.`)
    } 
});

app.intent(`thirdFloorFollowUp`, conv => {
    if (global.room == 3902) {
        conv.close(`Room ${global.room} is to your left.`)
    }
    else if (global.room == 3901 || global.room == 3903) {
        conv.close(`Follow the long hall on your right until you can shortly turn left. Room ${global.room} is on your right.`)
    }
    else if (global.room == 3002 || global.room == 3012) {
        conv.close(`Follow the long hall on your right and keep going straight until you see Room ${global.room} on your left.`)
    }
    else if (global.room == 3014) {
        conv.close(`Follow the long hall on your right and keep going straight until you see Room ${global.room} on your right.`)
    }
    else {
        conv.ask(`Follow the long hall on your right and turn right to another long hall. Let me know when you've done so.`)
    }
    
});

app.intent(`thirdFloorFollowUp2`, conv => {
    if (global.room % 2 == 1) {
        conv.close(`Keep continuing until you see Room ${global.room} on your right.`)
    }
    else {
        conv.close(`Keep continuing until you see Room ${global.room} on your left.`)
    }
});

app.intent(`fourthFloor`, (conv, {number}) => {
    global.room = number;
    if (number/1000 >= 4 && number/1000 < 5) {
        // fourth floor
        conv.ask(`Ok! Walk past the stairs ahead of you and instead take the stairs beside the elevator to floor four.
                    Let me know when you've done so.`)
    } 
});

app.intent(`fourthFloorFollowUp`, conv => {
    if (global.room == 4902) {
        conv.close(`Room ${global.room} is to your left.`)
    }
    else if (global.room == 4901 || global.room == 4903) {
        conv.close(`Follow the long hall on your right until you can shortly turn left. Room ${global.room} is on your right.`)
    }
    else if (global.room == 4008) {
        conv.close(`Follow the long hall on your right and keep going straight until you see Room ${global.room} on your left.`)
    }
    else if (global.room == 4003 || global.room == 4009) {
        conv.close(`Follow the long hall on your right and keep going straight until you see Room ${global.room} on your right.`)
    }
    else {
        conv.ask(`Follow the long hall on your right and turn right to another long hall. Let me know when you've done so.`)
    }
});

app.intent(`fourthFloorFollowUp2`, conv => {
    if (global.room % 2 == 1) {
        conv.close(`Keep continuing until you see Room ${global.room} on your right.`)
    }
    else {
        conv.close(`Keep continuing until you see Room ${global.room} on your left.`)
    }
});

exports.mybackend = functions.https.onRequest(app);