// path - inbuilt node module - does not require installation
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage} = require('./utils/message');
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
    

        // viewable only to client opening a connection
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat application'));

        // viewable to everyone but the client who has just opened a new connection
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    
      //# note - in this code, we catch event from client & then resend the retrieved data(message) to all clients
        //#acknowledgment - add second argument callback
    socket.on('createMessage', (message, callback) => { 
        console.log('createMessage', message);
        //broadcast to all
        io.emit('newMessage', generateMessage(message.from, message.text));
        // this will return the event to the emitter (in this case the client)
        callback('this is from the server');
    });        
      

    // disconnect even for server to client(browser or tabs)
    socket.on('disconnect', () => {
        console.log('disconnected from client');
    });
});

// socketIo integrated with express
server.listen(port, () => {
    console.log(`server is live on ${port}`);
});


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