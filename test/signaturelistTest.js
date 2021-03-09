const assert = require('chai').assert;
const signatureDataBase = {"Hello" : "World"};
const returnQuote = require('../src/signaturelist/signaturelist.js').returnQuote;
const addSignature = require('../src/signaturelist/signaturelist.js').addSignature;
const removeSignature = require('../src/signaturelist/signaturelist.js').removeSignature;

describe('Dictionary', function() {
    it('Returns string', function() {
        let quote = returnQuote("Signature");
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

describe('Adding a Signature', function() {
    it('Adds a new signature to the database', function() {
        addSignature(signatureDataBase, "Adding", "Signature");
        assert.equal(signatureDataBase["Adding"], "Signature");
    });
});

describe('Overwrite a Signature', function() {
    it('Overwrites a signature that already exists in the database', function() {
        addSignature(signatureDataBase, "Hello", "Universe");
        assert.equal(signatureDataBase["Hello"], "Universe");
    });
});

describe('Remove a Signature', function() {
    it('Removes a signature that already exists in the database', function() {
        removeSignature(signatureDataBase, "Hello");
        assert.equal(signatureDataBase["Hello"], undefined);
    });
});

describe('Failing to Remove a Signature', function() {
    it('Attempts to remove a signature that doesnt exist within the database', function() {
        failedRemoval = removeSignature(signatureDataBase, "Foo");
        assert.equal(failedRemoval, signatureDataBase);
    });
});