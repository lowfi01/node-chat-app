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


// Listener - will catch the broadcasted massage from server & render it to client using jQuery - 3rd stage in process
socket.on('newMessage', (message, callback) => { 
    console.log('newMessage', message);
        // use jQuery to create lists element
    var li = jQuery('<li></li>');
        // set li text
    li.text(`${message.from}: ${message.text}`);
    
        // append - li variable to the DOM (add to last child (last place))
    jQuery('#messages').append(li);
});       



// jQuery event - on Submit from button - will return function - e
    // first stage in process - client will create a message (emitter) & send to server, server will broadcast & then client will listen & render to screen at stage 3
jQuery('#message-form').on('submit', function (e) {
    // manipulate e - to prevent default behavior
    e.preventDefault();

    // emit createMessage event with the data send from the form
    socket.emit('createMessage', {
        from: 'User',
        // use selector to grab text field from forms
            // note - [name=value] - with will select name attributes = to message
        text: jQuery('[name=message]').val()
    }, function (data) {
        // callBack to acknowledgement
        console.log('got Message from form');
    });
});


/// old code - changed newMessage listener to push message data to be rendered to the screen #lecture 112
    // //listener - #listens for newMessage emitter events
    // socket.on('newMessage', function (message){
    //     // - this will receive all newMessage data & then print to console(viewable on browser)
    //     console.log('newMessage', message);
    // });
    //
    //     //create emitter #acknowledgement event
    //     //#acknowledgement event, - 3rd argument a callback function
    // socket.emit('createMessage', {
    //     from: 'Frank',
    //     text: 'Hi'
    // }, function(data) {
    //     console.log('got it!:  ', data);
    // });
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