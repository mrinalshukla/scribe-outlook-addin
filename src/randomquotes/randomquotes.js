import * as randomQuotes from "random-quotes";

function getQuotes (howMany) {
    return randomQuotes(howMany);
}

module.exports.default = getQuotes