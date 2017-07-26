// path - inbuilt node module - does not require installation
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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
        
    // note - on connection to client this message will print to console
    console.log('New user connected');

    //#  We can create Custom emitters & listeners or use default listeners, connection, connected, disconnected
    //#  Note - server & client are required for this operation to work & the socket.io - makes this connection
    //#  emitter  - are used to send data to listener
    //#  listeners - are used to receive data from emitter & then do something to data
   


    //listener - #listens for createMessage events (note - we are sending the emitter via the browser, forms or console)
    //# note - in this code, we catch event from client & then resend the retrieved data(message) to all clients
    socket.on('createMessage', (message) => { 
        // catch incoming emitter from client & then retrieve data then
        // create a broadcast event to every connected client
        // io.emit('eventName', { //dataToSend })
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        } );
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