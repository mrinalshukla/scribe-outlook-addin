//import randomQuotes from "randomquotes";
const assert = require('chai').assert;
const quotes = require('../src/randomquotes/randomquotes.js');
const howManyQuotesForTest = 3;

function prettyPrintQuotes(testQuotes) {
    testQuotes.forEach(function (quote) {
        console.log(`Random Quote => ${quote.body} -${quote.author}`)
    })
}

describe('Random Quote', function() {
    it('Grabs a random quote form the internet', function() {
        const testQuotes = quotes.getQuotes(howManyQuotesForTest);
        prettyPrintQuotes(testQuotes);

        assert.typeOf(testQuotes, "array");
        assert.equal(testQuotes.length, howManyQuotesForTest);
    });
});