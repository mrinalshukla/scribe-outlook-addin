const assert = require('chai').assert;
const returnQuote = require('../src/signaturelist/signaturelist.js').returnQuote;

describe('Dictionary', function() {
    it('Returns a string', function() {
        let quote = returnQuote('Steve Jobs');
        assert.typeOf(quote, "string");
    });
});

describe('Dictionary', function() {
    it('Returns a Steve Jobs quote', function() {
        let quote = returnQuote('Steve Jobs');
        assert.equal(quote, '"Stay hungry, stay foolish." -Steve Jobs');
    });
});

describe('Dictionary', function() {
    it('Returns a JFK quote', function() {
        let quote = returnQuote('JFK');
        assert.equal(quote, '"Those who dare to fail miserably can achieve greatly." -John F. Kennedy');
    });
});

describe('Dictionary', function() {
    it('Returns a Plato quote', function() {
        let quote = returnQuote('Plato');
        assert.equal(quote, '"The greatest wealth is to live content with little." - Plato');
    });
});