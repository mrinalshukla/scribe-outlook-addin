//import * as randomQuotes from "random-quotes";
const randomQuotes = require('random-quotes');

function getQuotes (howMany) {
    return randomQuotes.default(howMany);
}

module.exports.default = getQuotes