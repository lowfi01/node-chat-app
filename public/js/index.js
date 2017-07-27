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

// listener - geolocation event
socket.on('newLocationMessage', function (location) {
    var li = jQuery('<li></li>');
    // when you set anchor tag(<a>) - target="_blank", browser will create a new tab 
    var a = jQuery('<a target="_blank">My current location</a>')
    // set text in li 
    li.text(`${location.from}:`);
    // set attributes of a tags
        // set href - to url 
    a.attr('href', location.url)

    // append anchor tag (note - anchor tag normally sits within other tags)
    li.append(a);
    console.log(`this is the anchor tag: ${li}` );
    
    // 
    jQuery('#messages').append(li);
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


// store jQuery query to variable
    //jQuery('#send-location').on(); #note - code is the same as storing to variable
var locationButton = jQuery('#send-location');
//button click listener (geolocation)
locationButton.on('click', function(e) {
    //user does not have access to GEOLOCATION api
        // if no geoObject 
    if (!navigator.geolocation) {
        // - create alert function on browser ( option to select ok )
            // note - bootstrap or foundation emotes will work in-place of this
        return alert('Geolocation not support by your browser.');
    }

    //geolocation api call - returns location
    navigator.geolocation.getCurrentPosition(function(position) { //position return object with data - we will grab the lat & long - then emit to all users
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude

           
        });
        
    }, function (e) {
        // error handling
        console.log(e);
        alert('Unable to fetch location');
    });
})


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