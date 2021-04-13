const assert = require('chai').assert;
const signatureDrop = require('../src/signaturedropdown/signaturedropdown.js');
const quote1 = '"The greatest wealth is to live content with little." - Plato';
const quote2 = '"Stay hungry, stay foolish." -Steve Jobs';
const someList = [];


const signatureList = [{
    "ID" : 1,
    "details": {
        "firstName" : 'Juan',
        "lastName" : 'Ruiz',
        "title" : 'Student',
        "phone" : '720 - *** - ****',
        "website" : 'website',
        "quote" : quote1
    },
    "isDefault" : true
},
{
    "ID" : 2,
    "details": {
        "firstName" : 'John',
        "lastName" : 'Doe',
        "title" : 'Teacher',
        "phone" : '720 - *** - ****',
        "website" : 'website01',
        "quote" : quote2
    },
    "isDefault" : false
}];

describe('ID Number', function() {
    it('Return signatures from list', function() {
        someList.push(signatureDrop.returnSignatures(signatureList));
        assert.equal(someList.length, 2);
    });
});
