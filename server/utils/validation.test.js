const expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString', () => {


    it ('should reject non-string values', () => {
        var data = 123123;
        var check = isRealString(data);
            expect(check).toBe(false)
    });
    
        
    it ('should reject string with only spaces', () => {
        var data = '      ';
        var check = isRealString(data);
            expect(check).toBe(false)

    });

    it('should allow strings with non space characters', () => {
        var data = '   helloWorld  ';
        var check = isRealString(data);
            expect(check).toBe(true)
    });


});