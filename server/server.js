// inbuilt node module - does not require installation 
const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

// express middleware - making /public viewable to express to serve-up
app.use(express.static(publicPath));


app.listen(port, () => {
    console.log(`server is live on ${port}`);
});

