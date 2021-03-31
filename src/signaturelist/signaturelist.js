
//TODO Re-enable when ready to work on storage =>
// Office.initialize = initializeStorage;

// Initial Signature Databse
var signatureDataBase = {'Steve Jobs':'"Stay hungry, stay foolish." -Steve Jobs',
            'JFK':'"Those who dare to fail miserably can achieve greatly." -John F. Kennedy',
            'Plato':'"The greatest wealth is to live content with little." - Plato'};

//TODO Re-enable when ready to work on storage =>
// var myStorage = window.localStorage;

/* var signatureList = [{
    title : 'Steve Jobs',
    signature : '"Stay hungry, stay foolish." -Steve Jobs'
},
{
    title : 'JFK',
    message : '"Those who dare to fail miserably can achieve greatly." -John F. Kennedy'
},
{
    title : 'Plato',
    message : '"The greatest wealth is to live content with little." - Plato'
}] */

/*function returnQuote (Quote) {
    var quote = localStorage.getItem[Quote];
    return quote;
}*/

function addQuote (title) {
    localStorage.setItem(title, signatureList(title))

}

/*function initializeStorage () {
    myStorage = window.localStorage;
}*/

// Dropdown List Function
function displaySignatures () {
    document.getElementById("signatureDropdown").classList.toggle("show");
}

// Close Dropdown if user clicks outside of the menu
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdown = document.getElementsByClassName("dropdown-list");
        var x;
        for (x = 0; x < dropdown.length; x++) {
            var openMenu = dropdown[x];
            if (openMenu.classList.contains('show')) {
                openMenu.classList.remove('show');
            }
        }
    }
}

module.exports = {
    returnQuote: function(Quote1) {
    return signatureDataBase[Quote1];
    },

    addSignature: function(signatureTitle, signatureContents) {
        //This will create a new key, value pair if it does not exist or overwrite an existing
        //key, value pair if already in database
        //TODO re-enable for storage
        // myStorage.setItem(signatureTitle) = signatureContents;
        return myStorage;
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
    },

    listSignatures: function(signatureDB, signatureTitle) {
        const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
        width=0,height=0,left=-1000,top=-1000`;
        open('https://localhost:3000/src/signaturelist.html', 'test', params)
    },

    displaySignatures: displaySignatures
}
