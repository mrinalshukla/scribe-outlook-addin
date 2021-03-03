var signatureDataBase = {"Signature":"Quote",
            "Wow":"Hello",
            "Einstein":"Time"};

module.exports = {
    returnQuote: function(Quote1) {
    var quote  = signatureDataBase[Quote1];
    return quote;
    }
}