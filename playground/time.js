// playing with time

// note - all time stamp values - start from this moment in time.
// Unix epic = jan 1st 1970 00:00:00 am  
// note - (00)hours:(00)mins:(00)secs am
// note - time is stored in UTC (timezone independent)

//0 = jan 1st 1970 00:00:00 am
// 1000 = jan 1st 1970 00:00:01 am
// 10000 = jan 1st 1970 00:00:10 am
// -1000 = dec 31st 1969 11:59:59 pm

// note - javascript is stored in milliseconds since the unix epic
// note - inside of regular unix time-stamps, they are stored in seconds

// How do we convert, the timestamp to the screen?


// var date = new Date();
// console.log(date.getMonth()); //output = 6 (currently july, number counts from 0)

const moment = require('moment');

//var date = moment();
// argument of .format('patterns')
// console.log(date.format('MMM')); //output = Jul (currently july)
// console.log(date.format('MMM YYYY')); //output = Jul 2017 
// console.log(date.format('MMM YYYY ')); //output = Jul (currently july)
// console.log(date.format('ddd hA')); //output = Fri 7PM (note - upper case A = Capitals)
// console.log(date.format('MMM Do YYYY')); //output = July 28th 2017
// console.log(date.format('MMM Do, YYYY')); //output = July 28th, 2017

// add
// date.add(1, 'years'); //# add 1 yr
// console.log(date.format('MMM Do, YYYY')); //output = July 28th, 2018 #added 1 year

// subtract
// date.add(1, 'years').subtract(9, 'months'); //# add 1 yr & subtract 9 months
// console.log(date.format('MMM Do, YYYY')); //output = Oct 28th, 2017

// challenge
// outputs wanted = 10:35 am
// var date = moment();
// console.log(date.format('h:mm a')); //output = 7:24 pm

// using created at
var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a')); //output = 11:00 am

var someTimestamp = moment().valueOf();
console.log(someTimestamp);