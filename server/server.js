// path - inbuilt node module - does not require installation
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');



const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
// require - class
const {Users} = require('./utils/users');
// using path - to make routing to path easier
const publicPath = path.join(__dirname, '../public');
// heroku requirement
const port = process.env.PORT || 3000;
var app = express();

    // Make express work with http module
var server = http.createServer(app)
    // we pass the server we want to use with our web socket (note -server.listen & http.createServer)
var io = socketIO(server);
    // express middleware - making /public viewable to express to serve-up
app.use(express.static(publicPath));

//users instance - 
var users = new Users();

//  #register instance of event listener  - io.on('connection', callBack)
    //  #connection - listens for a new connection  
    //  #Note - that the connection event is persistent, between - client & server
io.on('connection', (socket) => { // - Returns socket, which we can manipulate
        
        // On connection to client this message will print to console
    console.log('New user connected');

            
    //
        //#  We can create Custom emitters & listeners or use default listeners, connection, connected, disconnected
        //#  Note - server & client are required for this operation to work & the socket.io - makes this connection
        //#  emitter  - are used to send data to listener
        //#  listeners - are used to receive data from emitter & then do something to data              

    // Large comment block - notes # emitters & listeners

//listener for join 
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        };

        // added variable to prevent upper & lower case errors
            // this was happening due to the fact i was converting the join room to lowercase & broadcasting to upper
        var room = params.room.toLowerCase();
        socket.join(room);
        users.removeUser(socket.id);
        //console.log('list of users pre add', users.users)
        users.addUser(socket.id, params.name, room);
        //console.log('list of users post add ', users.users)

        //console.log('get user list call', users.getUserList(room));
        //hello;
        io.to(room).emit('updateUserList', users.getUserList(room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat application'));
        socket.broadcast.to(params.room.toLowerCase()).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();


    });
    
    //# note - this will catch the message send from the form data & emit it to everyone - second Stage in process
        //#acknowledgment - add second argument callback
    socket.on('createMessage', (message, callback) => { 
            // get used from Users class
            var user = users.getUser(socket.id);

            // validate user is real & string is not empty
            if (users && isRealString(message.text)) {
                var name = user.name;
                // send to room only
                io.to(user.room).emit('newMessage', generateMessage(name, message.text));
            }

        
        callback('');
    });  



    // listen for createLocationMessage event & broadcast to all
        // pass through generateMessageObject
    socket.on('createLocationMessage', (coordinates) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coordinates.latitude, coordinates.longitude))
        };
    });

    // disconnect even for server to client(browser or tabs)
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        // if user was successfully removed
            // return event from removeUser is the user - if unsuccessful variable will be undefined
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
        }
        console.log('disconnected from client');
    });
});

// socketIo integrated with express
server.listen(port, () => {
    console.log(`server is live on ${port}`);
});

/// old code - final update - send msgs to specific room & change from message #lecture 126
    //         //# note - this will catch the message send from the form data & emit it to everyone - second Stage in process
    //         //#acknowledgment - add second argument callback
    //     socket.on('createMessage', (message, callback) => { 
    //         console.log('createMessage', message);
    //             //broadcast to all
    //         io.emit('newMessage', generateMessage(message.from, message.text));
    //             // this will return the event to the emitter (in this case the client)
    //         callback('');
    //     });  



    //     // listen for createLocationMessage event & broadcast to all
    //         // pass through generateMessageObject
    //     socket.on('createLocationMessage', (coordinates) => {
    //         io.emit('newLocationMessage', generateLocationMessage('Admin', coordinates.latitude, coordinates.longitude))
    //     });

    //     // disconnect even for server to client(browser or tabs)
    //     socket.on('disconnect', () => {
    //         var user = users.removeUser(socket.id);

    //         // if user was successfully removed
    //             // return event from removeUser is the user - if unsuccessful variable will be undefined
    //         if (user) {
    //             io.to(user.room).emit('updateUserList', users.getUserList(user.room));
    //             io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
    //         }
    //         console.log('disconnected from client');
    //     });
    // });
/// old code - moved code to comment to clean up code #lecture 125
    // //listener for join 
    // socket.on('join', (params, callback) => {
    //     //create validation to prevent empty strings
    //     if(!isRealString(params.name) || !isRealString(params.room)) {
    //         // if neither pass validation return error to callBack acknowledgement
    //         return callback('Name and room name are required.');
    //     }; // note - if true - callback will fire and nothing below will run

    //     // joining socket.io room
    //         // arguments socket.join('roomName')
    //     socket.join(params.room.toLowerCase());

    //     //prevent duplicate users
    //     users.removeUser(socket.id);


    //     // review socket methods
    //         // io.on // create a new socket connection - #'connection' - client side 'connect'
    //         // io.emit // create an emit event to all connected users
    //         // socket.broadcast.emit // send to all expect for current user(sender)
    //         // socket.emit // emittes event specifically to one user

    //        // room counterpart methods
    //            // io.on // create a new socket connection
    //            // io.emit -> io.to('roomName').emit // emittes to all users in room
    //            // socket.broadcast.emit -> socket.broadcast.to('roomName').emit // same as above, but to room
    //            // socket.emit -> 

    //     //add user to array        
    //            // note - addUser requires (id, name, room)
    //     users.addUser(socket.id, params.name, params.room);

    //     //emit - list of users - when new users joins room
    //     io.to('LOTR').emit('updateUserList', users.getUserList(params.room));
        
    //     // viewable only to client opening a connection
    //     socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat application'));

    //         // viewable to everyone but the client who has just opened a new connection
    //     socket.broadcast.to(params.room.toLowerCase()).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));


    //     // if no error - return callback empty
    //     callback();


    // });
/// old code - moved socket.emit & socket.broadcast to 'join' also edited code #122
    //         // viewable only to client opening a connection
    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat application'));

    //     // viewable to everyone but the client who has just opened a new connection
    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

/// old code - reformat listener to emit newLocationMessage rather then message #lecture 114
/// old code - reformated listener to use acknowledgements #lecture 111
    //   //# note - in this code, we catch event from client & then resend the retrieved data(message) to all clients
    //     socket.on('createMessage', (message) => { 
    //         console.log('createMessage', message);
    //         //broadcast to all
    //         io.emit('newMessage', generateMessage(message.from, message.text));
            
    //     });
/// old code - reformated emitters to take message object #lecture 110
    //     //challenge #create emitter 
    //     // from admin, text - welcome to chat application
    //     // viewable only to client opening a connection
    // socket.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'Welcome to chat application'
    // });
    // // challenge #create broadcast emitter
    //     // from admin, text - new user joined
    //     // viewable to everyone but the client who has just opened a new connection
    // socket.broadcast.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'New user joined'
    // });
    
            
    // //listener - #listens for createMessage events (note - we are sending the emitter via the browser, forms or console)
    //     //# note - in this code, we catch event from client & then resend the retrieved data(message) to all clients
    // socket.on('createMessage', (message) => { 
    //     // catch incoming emitter from client & then retrieve data then
    //     console.log('createMessage', message);
    //     // create a broadcast - to everyone but this socket
    //         //socket.broadcast.emit
    //     // socket.broadcast.emit('newMessage', { 
    //     //     from: message.from,
    //     //     text: message.text,
    //     //     createAt: new Date().getTime()
    //     //  });
    //         // create a broadcast event to every connected client #old code with broadcast all
    //             // io.emit('eventName', { //dataToSend })
    //                 // io.emit('newMessage', {
    //                 //     from: message.from,
    //                 //     text: message.text,
    //                 //     createdAt: new Date().getTime()
    //                 // } );
        
    // });
/// old code - removed emitter, reference the comments in serer.js #lecture 109
        // //emitter
    // socket.emit('newMessage', {
    //     from: 'james@example.com',
    //     text: "Hey. Whats is going on?",
    //     createdAt: 123
    // });

/// old code - email emitter & listener examples + comments #lecture 108

    // // custom emitter
    // // argument (nameOfEvent, {specify the data here})
    // socket.emit('newEmail', {
    //     // custom data here
    //     from: 'mike@example.com',
    //     text: "hey what's cracking",
    //     createdAt: 123

    // });

    // // custom event listener
    // // argument (nameOfEventToListenTo, function (dataReturnedWhenEventTriggers) {do something with data})
    // socket.on('createEmail', (data) => {
    //     console.log('createEmail', data);
    // })