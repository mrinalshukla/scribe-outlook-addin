const assert = require('chai').assert;
const returnQuote = require('../src/signaturelist/signaturelist.js').returnQuote;

describe('Dictionary', function() {
    it('Returns string', function() {
        let quote = returnQuote(Signature);
        assert.typeOf(quote, "string");
    });
});

describe('Dictionary', function() {
    it('Returns value for specified key', function() {
        let quote = returnQuote("Signature");
        assert.equal(quote, "Quote");
    });
});

describe('Dictionary', function() {
    it('Returns value for specified key', function() {
        let quote = returnQuote("Einstein");
        assert.equal(quote, "Time");
    });
});

//Add tests to catch errors (Make sure input is string)