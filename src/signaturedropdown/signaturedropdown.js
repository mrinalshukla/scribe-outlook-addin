const database = require('../signaturecommands/database.js');

//Office.initialize = initializeStorage;

// Initial Signature Databse
var signatureDataBase = {'Steve Jobs':'"Stay hungry, stay foolish." -Steve Jobs',
            'JFK':'"Those who dare to fail miserably can achieve greatly." -John F. Kennedy',
            'Plato':'"The greatest wealth is to live content with little." - Plato'};

//var myStorage = window.localStorage;
/*
var signatureDropdown = [{
    title : 'Steve Jobs',
    contents : '"Stay hungry, stay foolish." -Steve Jobs'
},
{
    title : 'JFK',
    contents: '"Those who dare to fail miserably can achieve greatly." -John F. Kennedy'
},
{
    title : 'Plato',
    contents : '"The greatest wealth is to live content with little." - Plato'
}] */

/*function returnQuote (Quote) {
    var quote = localStorage.getItem[Quote];
    return quote;
}*/

/*function addQuote (title) {
    localStorage.setItem(title, signaturedropdown(title))

}*/

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
// Function to return a quote
function returnQuote (Quote1) {
    return signatureDataBase[Quote1];
}

// Function to add a signature to the signature list
function returnSignatures (signatureList) {

    var select= document.getElementById("getTitle");

    for (i=0; i < signatureList.length; i++) {
        var title = document.createElement("title");
        title.text = title.value = database.getTitle(signatureList[i])
        select.add(title,0);
            
    }
}
// Testing the implementation of the returnSignatures function differently
function returnDropdown (signatureDropdown) {
    var select= document.getElementById("signatureDropdown");

    for (i=0; i < signatureDropdown.length; i++) {
        var title = document.createElement("title");
        title.text = title.value = database.getTitle(signatureDropdown[i])
        select.add(title,0);
        
    }
}

module.exports.displaySignatures = displaySignatures
module.exports.returnQuote = returnQuote
module.exports.returnSignatures = returnSignatures
module.exports.returnDropdown = returnDropdown
