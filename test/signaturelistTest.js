const assert = require('chai').assert;
const signatureDataBase = {"Hello" : "World"};
const returnQuote = require('../src/signaturelist/signaturelist.js').returnQuote;
const addSignature = require('../src/signaturelist/signaturelist.js').addSignature;
const removeSignature = require('../src/signaturelist/signaturelist.js').removeSignature;
const listSignatures = require('../src.signaturelist/signaturelist.js').listSignatures;

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

describe('Display Signature List', function() {
    it('Display the signatures in the database as a list', function() {
        displayList = displaySignatures(signatureDataBase, "");
        assert.equal(displayList, signatureDataBase);
    });
});