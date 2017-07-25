// inbuilt node module - does not require installation 
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// using path - to make routing to path easier
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

// Make express work with http module
var server = http.createServer(app)
// we pass the server we want to use with our web socket (note -server.listen & http.createServer)
var io = socketIO(server);
// express middleware - making /public viewable to express to serve-up
app.use(express.static(publicPath));

// register a event listener
// connection - listens for a new connection
io.on('connection', (socket) => {
    //call back is a socket
    // note - that the connection event is persistent, between - client & server
    console.log('New user connected');
   
    // this will trigger - when a browser tab that has a live connect is closed
    socket.on('disconnect', () => {
                console.log('disconnected from client');
            });
});



server.listen(port, () => {
    console.log(`server is live on ${port}`);
});

