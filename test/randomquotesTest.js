//import randomQuotes from "randomquotes";
const assert = require('chai').assert;
const quotes = require('../src/randomquotes/randomquotes.js');

describe('Random Quote', function() {
    it('Grabs a random quote form the internet', function() {
        let testQuote = quotes.default(2);
        console.log("Random quotes : " + JSON.stringify(testQuote));
        assert.typeOf(testQuote, "array");
    });
});