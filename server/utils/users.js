//array storing users [array]

[{
    id: '',
    name: '',
    room: ''
}]

// users - array [id,name,room]
// addUser - id, name, roomName
// removeUser - id
// getUser - id - return object
// getUserList - roomName - return users within room


class Users{
    constructor() {
        this.users = [];
    };

    addUser(id, name, room) {
            // note - es6 auto fills keyValue pairs with matching names
        var user = {id, name, room}
        this.users.push(user);
        return user;
    };

    removeUser(id) {
        // return users that was removed


        // teachers code

        var user = this.getUser(id);
        if (user) {
            // create new array - with the filtered value of the old array
            this.users = this.users.filter((user) => {
                // note - untrue values will not be added to array.
                    // this will create a new array with out the user id we passed
                return user.id !== id;
            });
        }

        console.log('USER',  user)
        // regardless of result we still want to return user - defined or undefined
        return user;

        // // my code
        // var users = this.users.filter((user) => {
        //     return user.id === id;
        // });

        // var index = this.users.map((user) => {
        //     return user.id;
        // }).indexOf(id);

        // var user = users.map((user) => user.name);
        // //console.log('index', index);
        // this.users.splice(index, index);
        // return user;
        

    }

    getUser(id) {

        //teachers code
            //this code is cool asf, note - filter will only return users that match the id we passed
            //this result is stored in an array of objects
            //so we can simply require element [0] to be returned, as we only want 1 user, the return value should only ever be 1
            //or in this case an array with 1 value - [0]
        return this.users.filter((user) => user.id === id)[0];


        // // my code 
        // var users = this.users.filter((user) => {
        //     // returns true if users.id === id we passed
        //     return user.id === id;
        // });

        // var userName = users.map((user) => user.name);

        // return userName;
    }

    getUserList(room) {
        // iterate through users array & return
            // search array - filter (function (returnResults) 
            // note - returned result is an array of objects
            // { return true = add to list returned, return false = does not add item to returned list})
        var users = this.users.filter((user) => {
            return user.room === room});

        // convert array of object to array of strings
        var namesArray = users.map((user) => user.name);

        //console.log(`users before map`, users)
        return namesArray;
        // different syntax
        // var users = this.users.filter((user) => user.room === room);
    } 

};


//called with individual item - returns list of those items
                // check array - users, if user.room match's room
module.exports = {Users};


//es6 classes
    // create class for person
        // set of data & methods - useful for manipulating a person

// note - Captial letter is just common conversion for javaScript
    //eg - new Object, new Person, new Something

// // create class
// class Person{
//     // constructor function - (automatically fires, same as c#)
//     // arguments - are passed when called same as c#
//     constructor (name, age) {
//         // note - we are setting the persons name and age... not just for everyone
//             // confusing - but when you call this class, you use it to manipulate a specific person object
//             // so to prevent manipulating all name attributes, we can use this.name to target the name attribute
//             // from the callers code block. 
//                 // this. refers to the instance not that class - eg, this.name is from the callers code, not the code in the class
//                 // this. = the me property in the instance
                
//     this.name = name;
//     this.age = age;
//     }
//     //methods in classes
//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// };

// // call class
// var me = new Person('James', 25);
//     //me = this.
//         // console.log('this.name', me.name);
//         // console.log('this.age', me.age);

// // using methods - within classes 
// var description = me.getUserDescription();
// console.log(description);