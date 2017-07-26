// JavaScript Code - we will be injecting to index.html


// io() - opens connection  #Access given by SocketIO javascript library <script injection>
var socket = io();     

// connect event for client to server
socket.on('connect', function () {
    console.log('connected to server');
});

// disconnect even for client to server
socket.on('disconnect', function () {
    console.log('disconnected from server');
});


//listener - #listens for newMessage emitter events
socket.on('newMessage', function (message){
    // - this will receive all newMessage data & then print to console(viewable on browser)
    console.log('newMessage', message);
});

//create emitter #acknowledgement event
    //#acknowledgement event, - 3rd argument a callback function
socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi'
}, function(data) {
    console.log('got it!:  ', data);
});




/// old code - removed socket.emit & replaced it with io.emit in server.js lecture 109
    // note - this was done so that we can broadcast to all clients from the server.
    // note - we did not have to emit from the server, we simply emited the clients message to everyone else
    // //emitter - createMessage
    // socket.emit('createMessage', {
    //     // note - emitter senders & triggers listener
    //     from: 'client@example',
    //     text: "Yo fam, im the client sending you a message :D"
    // });
/// old code - email examples emitters & listeners #lecture 108

    // // custom event emitter
    // // argument (nameOfEvent, {specify the data here})
    // socket.emit('createEmail', {
    //     to: 'jen@example.com',
    //     text: 'Hey. this is James whats cracking'
    // });

    // // custom event listener
    // // argument (nameOfEventToListenTo, function (dataReturnedWhenEventTriggers) {do something with data})
    // socket.on('newEmail', function (data) {
    //     console.log('New Email', data);
    // });





/// old code + comments from previous #lectures 106

    // // io() - makes request from client to server, to open socketIo & keep connection open
    // // we will be using var socket - to send & receive data
    // var socket = io(); 
    // // connect event for client
    // // event fires when - connected to server
    // socket.on('connect', function () {
    // // note we do not get access to a call back event - because we already have it, it's the socket variable
    // console.log('connected to server');
    // });
    // // disconnect even for client
    // // event fires when - disconnected from server
    // socket.on('disconnect', function () {
    // console.log('disconnected from server');
    // });