var signatureDataBase = {"Signature":"Quote",
            "Wow":"Hello",
            "Einstein":"Time"};

module.exports = {
    returnQuote: function(Quote1) {
    var quote  = signatureDataBase[Quote1];
    return quote;
    },

    addSignature: function(signatureDB, signatureTitle, signatureContents) {
        //This will create a new key, value pair if it does not exist or overwrite an existing
        //key, value pair if already in database
        signatureDB[signatureTitle] = signatureContents;
        return signatureDB;
    },
    
    removeSignature: function(signatureDB, signatureTitle) {
        //This will remove a key, value pair from the database if it exists
        if(signatureDB.hasOwnProperty(signatureTitle)) {
        delete signatureDB[signatureTitle];
            }
        else {
            console.log("There is no existing item with the provided title.");
        }
        return signatureDB;
    }
}