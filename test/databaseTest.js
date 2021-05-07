/*TODO Find a way to get past the 'ReferenceError: Office is not defined'
    To get test to run, need to go into database.js and comment out lines 1-11.
    
    TODO Update these variables to match current database.js*/


const assert = require('chai').assert;
const database = require('../src/signaturecommands/database.js');

const quote1 = '"The greatest wealth is to live content with little." - Plato';
const quote2 = '"Stay hungry, stay foolish." -Steve Jobs';

const jsonObject = {
    "ID" : 1,
    "details": {
        "firstName" : 'Juan',
        "lastName" : 'Ruiz',
        "title" : 'Student',
        "phone" : '720 - *** - ****',
        "website" : 'website',
        "quote" : quote1
    },
    "isDefault" : true
};

const signatureList = [{
    "ID" : 1,
    "details": {
        "firstName" : 'Juan',
        "lastName" : 'Ruiz',
        "title" : 'Student',
        "phone" : '720 - *** - ****',
        "website" : 'website',
        "quote" : quote1
    },
    "isDefault" : true
},
{
    "ID" : 2,
    "details": {
        "firstName" : 'John',
        "lastName" : 'Doe',
        "title" : 'Student',
        "phone" : '720 - *** - ****',
        "website" : 'website01',
        "quote" : quote2
    },
    "isDefault" : false
}];

const newJsonObject = {
    "ID" : signatureList.length + 1,
    "details": {
        "firstName" : 'New First Name',
        "lastName" : 'New Last Name',
        "title" : 'New Student',
        "phone" : 'New Number',
        "website" : 'New Website',
        "quote" : quote1
    },
    "isDefault" : false
};

describe('getId', function() {
    it('Grabs ID number from JSON object', function() {
        const signatureId = database.getId(jsonObject);

        assert.equal(signatureId, 1);
    });
});

describe('getFirstName', function() {
    it('Grabs first name from JSON object', function() {
        const signatureFirstName = database.getFirstName(jsonObject);

        assert.equal(signatureFirstName, 'Juan');
    });
});

describe('getLastName', function() {
    it('Grabs last name from JSON object', function() {
        const signatureLastName = database.getLastName(jsonObject);

        assert.equal(signatureLastName, 'Ruiz');
    });
});

describe('getTitle', function() {
    it('Grabs title from JSON object', function() {
        const signatureTitle = database.getTitle(jsonObject);

        assert.equal(signatureTitle, 'Student');
    });
});

describe('getPhone', function() {
    it('Grabs phone from JSON object', function() {
        const signaturePhone = database.getPhone(jsonObject);

        assert.equal(signaturePhone, '720 - *** - ****');
    });
});

describe('getWebsite', function() {
    it('Grabs website from JSON object', function() {
        const signatureWebsite = database.getWebsite(jsonObject);

        assert.equal(signatureWebsite, 'website');
    });
});

describe('getQuote', function() {
    it('Grabs quote from JSON object', function() {
        const signatureQuote = database.getQuote(jsonObject);

        assert.equal(signatureQuote, quote1);
    });
});

describe('getIsDefault', function() {
    it('Sees if signature is the default', function() {
        const signatureIsDefault = database.getIsDefault(jsonObject);

        assert.equal(signatureIsDefault, true);
    });
});

describe('getId', function() {
    it('Grabs ID number from specific JSON Object in a list', function() {
        const signatureId = database.getId(signatureList[1]);

        assert.equal(signatureId, 2);
    });
});

describe('getIsDefault', function() {
    it('Sees if signature is false in the second JSON object from list', function() {
        const signatureIsDefault = database.getIsDefault(signatureList[1]);

        assert.equal(signatureIsDefault, false);
    });
});

describe('addJSON', function() {
    it('Adds the newJsonObject into signatureList', function() {
        database.extend(signatureList,newJsonObject);

        assert.equal(signatureList.length, 3);
        assert.equal(database.getIdNumber(signatureList[2]), 3);
        assert.equal(database.getFirstName(signatureList[2]), 'New First Name');
    });
});
