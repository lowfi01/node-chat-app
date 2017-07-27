var expect = require('expect');


var {generateMessage, generateLocationMessage} = require('./message');
//var app = require('');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        // synchronies test - #does not require done
            // call generate message & store to variable
            // expect - from, message match's, createdAt number
        var message = { from: 'james', text: 'hello world'};
        var check = generateMessage(message.from, message.text);

                // expect(check.text).toBe(message.text);
                // expect(check.from).toBe(message.from);
                expect(check.createAt).toBeA('number');
                expect(check).toInclude({
                    from: message.from, 
                    text: message.text
                });         
    })
})

describe('generateLocationMessage', () => {

    it('should generate correct location object', () => {
        
        var from = 'james';
        var lat = 1;
        var lng = 2;
        var location = generateLocationMessage(from, lat, lng);

        // expected + assertions
        expect(location.createAt).toBeA('number');
        expect(location).toInclude({
            from: 'james',
            url: `https://www.google.com.au/maps?q=1,2`
        })

    })
} )