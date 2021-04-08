const assert = require('chai').assert;
const signatureDataBase = {"Hello" : "World"};
const returnQuote = require('../src/signaturedropdown/signaturedropdown.js').returnQuote;
const addSignature = require('../src/signaturedropdown/signaturedropdown.js').addSignature;
const removeSignature = require('../src/signaturedropdown/signaturedropdown.js').removeSignature;
const listSignatures = require('../src.signaturelist/signaturedropdown.js').listSignatures;
const displaySignatures = require('../src/signaturedropdown/signaturedropdown.js').displaySignatures;

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
        addSignature("Adding", "Signature");
        assert.equal(localStorage.getItem("Adding"), "Signature");
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

describe('Display Signature Dropdown', function() {
    it('Display the signatures in the database in a dropdown menu', function() {
        displayDropdown = displaySignatures(signatureDataBase, "Steve Jobs");
        assert.equal(displayDropdown, signatureDataBase);
    });
});

describe('Display Signature List', function() {
    it('Display the signatures in the database as a list', function() {
        displayList = listSignatures(signatureDataBase, "Steve Jobs");
        assert.equal(displayList, signatureDataBase);
    });
});