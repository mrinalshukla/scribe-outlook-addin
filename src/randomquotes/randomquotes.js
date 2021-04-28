const randomQuotes = require('random-quotes');

function getQuotes (howMany) {
    return randomQuotes.default(howMany);
}

module.exports.getQuotes = getQuotes