// use moment

var moment = require('moment');

// return an object to emit
var generateMessage = (from, text) => {
    return {
        from,
        text,
        //createAt: new Date().getTime()
        createAt: moment().valueOf()
    };
};

var generateLocationMessage = (from, lat, lng) => {
    return {
        from,
        url: `https://www.google.com.au/maps?q=${lat},${lng}`,
        //createAt: new Date().getTime()
        createAt: moment().valueOf()

    };
};

module.exports = {
    generateMessage, generateLocationMessage
};