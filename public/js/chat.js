// JavaScript Code - we will be injecting to index.html


// io() - opens connection  #Access given by SocketIO javascript library <script injection>
var socket = io();     


// auto scrolling function
function scrollToBottom() {
    //Selectors
        var messages = jQuery('#messages'); //select all elements with id = #messages
        var newMessage = messages.children('li:last-child'); // select the li items, that are the last child(last item)
    //Heights
        var clientHeight = messages.prop('clientHeight'); //cross browser way to select property
        var scrollTop = messages.prop('scrollTop');
        var scrollHeight = messages.prop('scrollHeight');
        var newMessageHeight = newMessage.innerHeight(); // calculate the height of the last message
        var lastMessageHeight = newMessage.prev().innerHeight(); // prev() = move to previous child // calculate the height of the second last item

    // all other heights >= scrollHeight
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
            //jQuery method to set the scrollTop value = to scrollHeight
        messages.scrollTop(scrollHeight);
    };
};

// listener for connection even (connect to connection on server) #note - Main connection method for client & server, happens first
socket.on('connect', function () {
        //note - location is a DOM option - we will use it to return the search query in the url
    var params = jQuery.deparam(window.location.search);
    /// connect event for client to server #transfer search result
        //# using window.location.search, from the url result of joining a room - we will emit this to server to ensure we only broadcast to room
        //# note - params is an object! - which is wat we normally pass
    socket.emit('join', params, function (err) {
        //acknowledgement callback
        if (err) {
            // if error is return by acknowledgement that room or name are invalid
                // return used back to index.html (root)
            alert(err); // note - err msg is the string we passed on listener
            window.location.href = '/';
        }else{
            //console.log('params passed', params);
        }
    }) 
    
});

// disconnect even for client to server
socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function(user) {
        // iterate over all the users
        ol.append(jQuery('<li></li>').text(user));
    });

    // append will only update, while .html will create a new list
    jQuery('#users').html(ol);
    //console.log('hello this emit is working', users);
})

// listener - geolocation event
socket.on('newLocationMessage', function (location) {
    var formattedTime = moment(location.createAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: location.url,
        from: location.from,
        createAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

// Listener - will catch the broadcasted massage from server & render it to client using mustache - 3rd stage in process
socket.on('newMessage', function (message) { 
    var formattedTime = moment(message.createAt).format('h:mm a');
    // - .html() method will return the markup within the '#message-template' - which is the p tags
    var template = jQuery('#message-template').html();
    // - mustache, takes template you want to render
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});       


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]')

    socket.emit('createMessage', {
        text: messageTextBox.val()
    }, function (data) {// callBack to acknowledgement
        messageTextBox.val(' ');
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
    
        //disable the button - to prevent spamming & re-enable post success of url
    locationButton.attr('disabled', true).text('Sending location......');

    //geolocation api call - returns location
    navigator.geolocation.getCurrentPosition(function(position) { //position return object with data - we will grab the lat & long - then emit to all users
             //note - success case of api call 
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
            
        }, function (e) { //acknowledgement callback
            
        });
        
    }, function (e) {
            // error handling
        console.log(e);
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
})


/// old code - final update - send msgs to specific room & change from message #lecture 126
    // jQuery event - on Submit from button - will return function - e
    //     // first stage in process - client will create a message (emitter) & send to server, server will broadcast & then client will listen & render to screen at stage 3
    // jQuery('#message-form').on('submit', function (e) {
    //         // manipulate e - to prevent default behavior
    //     e.preventDefault();

    //         // note - [name=value] - this is a method to select name attributes from html
    //     var messageTextBox = jQuery('[name=message]')

    //         // emit createMessage event with the data send from the form
    //     socket.emit('createMessage', {
    //         from: 'User',
    //             // use selector to grab text field from forms
    //         text: messageTextBox.val()
    //     }, function (data) {// callBack to acknowledgement
    //             // select text box via name attribute & clear the text with empty string
    //                 // #note - this is a callback acknowledgement, as it is post the emit request, we can clear the text field after submit button has been called  
    //         messageTextBox.val(' ');
    //     });
    // });

/// old code - changed code from jQuery injection to mustache.js templates #lecture 118
    //     // Listener - will catch the broadcasted massage from server & render it to client using jQuery - 3rd stage in process
    // socket.on('newMessage', (message, callback) => { 
    //     var formattedTime = moment(message.createAt).format('h:mm a');
    //     console.log('newMessage', message);
    //         // use jQuery to create lists element
    //     var li = jQuery('<li></li>');
    //         // set li text
    //     li.text(` ${message.from} ${formattedTime}: ${message.text}`);
        
    //         // append - li variable to the DOM (add to last child (last place))
    //     jQuery('#messages').append(li);
    // });      
    // listener - geolocation event
    // socket.on('newLocationMessage', function (location) {
    //     var formattedTime = moment(location.createAt).format('h:mm a');
    //     var li = jQuery('<li></li>');
    //         // when you set anchor tag(<a>) - target="_blank", browser will create a new tab 
    //     var a = jQuery('<a target="_blank">My current location</a>')
    //         // set text in li 
    //     li.text(`${location.from} ${formattedTime}: `);
    //         // set attributes of a tags
    //             // set href - to url 
    //     a.attr('href', location.url)

    //     // append anchor tag (note - anchor tag normally sits within other tags)
    //     li.append(a);
    //     console.log(`this is the anchor tag: ${li}` );
        
    //     // 
    //     jQuery('#messages').append(li);
    // });
/// old code - changed both jQuery requests to allow for removing text from text - disabling send location to prevent spam #lecture115
  //// jQuery event - on Submit from button - will return function - e
    // first stage in process - client will create a message (emitter) & send to server, server will broadcast & then client will listen & render to screen at stage 3
    // jQuery('#message-form').on('submit', function (e) {
    //         // manipulate e - to prevent default behavior
    //     e.preventDefault();

    //         // emit createMessage event with the data send from the form
    //     socket.emit('createMessage', {
    //         from: 'User',
    //         // use selector to grab text field from forms
    //             // note - [name=value] - with will select name attributes = to message
    //         text: jQuery('[name=message]').val()
    //     }, function (data) {
    //         // callBack to acknowledgement
    //         console.log('got Message from form');
    //     });
    // });


    // // store jQuery query to variable
    //     //jQuery('#send-location').on(); #note - code is the same as storing to variable
    // var locationButton = jQuery('#send-location');
    // //button click listener (geolocation)
    // locationButton.on('click', function(e) {
    //         //user does not have access to GEOLOCATION api
    //             // if no geoObject 
    //     if (!navigator.geolocation) {
    //             // - create alert function on browser ( option to select ok )
    //                 // note - bootstrap or foundation emotes will work in-place of this
    //         return alert('Geolocation not support by your browser.');
    //     }

    //     //geolocation api call - returns location
    //     navigator.geolocation.getCurrentPosition(function(position) { //position return object with data - we will grab the lat & long - then emit to all users
    //         socket.emit('createLocationMessage', {
    //             latitude: position.coords.latitude,
    //             longitude: position.coords.longitude

            
    //         });
            
    //     }, function (e) {
    //             // error handling
    //         console.log(e);
    //         alert('Unable to fetch location');
    //     });
    // })
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