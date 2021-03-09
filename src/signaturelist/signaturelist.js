var signatureDataBase = {'Steve Jobs':'"Stay hungry, stay foolish." -Steve Jobs',
            'JFK':'"Those who dare to fail miserably can achieve greatly." -John F. Kennedy',
            'Plato':'"The greatest wealth is to live content with little." - Plato'};

module.exports = {
    returnQuote: function(Quote1) {
    var quote  = signatureDataBase[Quote1];
    return quote;
    },

    addSignature: function(signatureDB, signatureTitle, signatureContents) {
        //This will create a new key, value pair if it does not exist or overwrite an existing
        //key, value pair if already in database
        signatureDB[signatureTitle] = signatureContents;
    },
    
    removeSignature: function(signatureDB, signatureTitle) {
        //This will remove a key, value pair from the database if it exists
        if(signatureDB.hasOwnProperty(signatureTitle)) {
        delete signatureDB[signatureTitle];
            }
        else {
            console.log("There is no existing item with the provided title.");
        }
    }
}