const database = require('../signaturecommands/database.js');

// Dropdown List Function
function displaySignatures () {
    document.getElementById("signatureDropdown").classList.toggle("show");
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

function returnTitleLoop(){
    var signatureList = Office.context.roamingSettings.get("signatureList");
    var signatureDropdown = document.getElementById("signatureDropdown");
    console.log("Loop is getting called.")
    
    for (i=0; i < signatureList.length; i++){
        var signatureID = database.getID(signatureList[i]);
        var option = document.createElement("option");
        option.value = signatureID;
        option.innerHTML = signatureID;
        signatureDropdown.appendChild(option);
    }
}  

module.exports.displaySignatures = displaySignatures
module.exports.returnQuote = returnQuote
module.exports.returnSignatures = returnSignatures
module.exports.returnTitleLoop = returnTitleLoop
