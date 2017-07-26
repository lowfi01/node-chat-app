var expect = require('expect');


var {generateMessage} = require('./message');
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