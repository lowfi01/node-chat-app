var isRealString = (str) => {
    // return tru if str is a string & post trimming has a character length of more then 0
    return typeof str === 'string' && str.trim().length > 0;
};

module.exports = { isRealString };