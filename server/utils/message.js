// return an object to emit
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createAt: new Date().getTime()
    };
};

var generateLocationMessage = (from, lat, lng) => {
    return {
        from,
        url: `https://www.google.com.au/maps?q=${lat},${lng}`,
        createAt: new Date().getTime()

    };
};

module.exports = {
    generateMessage, generateLocationMessage
};