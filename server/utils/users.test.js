const expect = require('expect');
var {Users} = require('./users');




describe('users', () => {
var users; 

    // runs before all tests - inject test data
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'mike',
            room: 'Node Course'
        }, 
        {
            id: '2',
            name: 'jen',
            room: 'react Course'}, 
        {
            id: '3',
            name: 'james',
            room: 'Node Course'}
        ]
    });

    it ('should add new user', () => {
        //  Users Object
        var users = new Users();

        var user = {
            id: '234',
            name: 'james',
            room: 'hello world!'
        };

        var check = users.addUser(user.id, user.name, user.room);

            // check that users array has been updated #firstUsers, is the users instance, second is the users array in class
                // check that array has user object
            expect(users.users).toEqual([user]);
            

    });
    
    it('should remove user & return user', () => {
        var user = users.removeUser(users.users[2].id);
            //console.log('USER LIST', users.users);

            expect(user).toInclude({
                name: 'james'
            });
            expect(users.users.length).toBe(2);

    });
    
    it('should not remove user', () => {
        // pass invalid user id
        var user = users.removeUser('44');

            expect(user).toNotExist();
            expect(users.users.length).toEqual(3);
    });

    it('should find a user', () => {
        var user = users.getUser('2');
            expect(user).toEqual(users.users[1]);
    });

    it('should not find a user', () => {
        var user = users.getUser('44');

            expect(user).toNotExist();
            //expect(user).toBe(undefined);
    })

    it('should return names from node course room', () => {

        var userList = users.getUserList('Node Course');
        //console.log(`userList`, userList);

            expect(userList).toEqual(['mike', 'james']);
            


    });
});