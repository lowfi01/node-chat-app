// this will contain javascript code that loads on index.html


// io() - opens connection
var socket = io();     

// connect event for client
socket.on('connect', function () {
    console.log('connected to server');
});

// disconnect even for client
socket.on('disconnect', function () {
    console.log('disconnected from server');
});

//emitter
socket.emit('createMessage', {
    // note - emitter senders & triggers listener
    from: 'client@example',
    text: "Yo fam, im the client sending you a message :D"
});

//listener
socket.on('newMessage', function (message){
    // note - listener listens & receives 
    console.log('newMessage', message);
});





/// old code - email examples emitters & listeners

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





////////////// old code + comments from previous lectures 106

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