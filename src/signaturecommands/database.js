//URL -- https://docs.microsoft.com/en-us/office/dev/add-ins/develop/persisting-add-in-state-and-settings
    //    saveAsync method to save any changes in JSON file 

var signatureListDB = Office.context.roamingSettings; //this is 'var _setting' from URL 
signatureList = signatureListDB.get("signatureList")

//This callback method is OPTIONAL.  Can be removed from .saveAsync().
function saveMyAppSettingsCallback(asyncResult) {
    if (asyncResult.status == Office.AsyncResultStatus.Failed) {
        // Handle the failure.
    }
} 

function extend (signatureList, signatureJSON){
    signatureList.push(signatureJSON);
}

function setSignature (){
    var IDNumber = signatureList.length + 1; 
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var title = document.getElementById("title").value;
    var phone = document.getElementById("phone").value;
    var website = document.getElementById("website").value;
    var quote = document.getElementById("quote").value;
    if (IDNumber == 1){
        var signatureJSON = {
            "ID" : IDNumber,
            "details": {
                "firstName" : firstName,
                "lastName" : lastName,
                "title" : title,
                "phone" : phone,
                "website" : website,
                "quote" : quote
            },
            "isDefault" : true
        }
    }
    else {
        var signatureJSON = {
            "ID" : IDNumber,
            "details": {
                "firstName" : firstName,
                "lastName" : lastName,
                "title" : title,
                "phone" : phone,
                "website" : website,
                "quote" : quote
            },
            "isDefault" : false
        }
    }

    extend(signatureList,signatureJSON) 
    signatureListDB.set("signatureList", signatureList); //Not sure if this line of code is needed.
    signatureListDB.saveAsync(saveMyAppSettingsCallback);
}

//https://www.w3schools.com/js/js_json_objects.asp on info for how get JSON objects

function getIDNumber(signatureJSON){
    var signatureID = signatureJSON.ID;
    return signatureID;
}

function getFirstName(signatureJSON){
    var signatureFirstName = signatureJSON.details.firstName;
    return signatureFirstName;
}

function getLastName(signatureJSON){
    var signatureLastName = signatureJSON.details.lastName;
    return signatureLastName;
}

function getTitle(signatureJSON){
    var signatureTitle = signatureJSON.details.title;
    return signatureTitle;
}

function getPhone(signatureJSON){
    var signaturePhone = signatureJSON.details.phone;
    return signaturePhone;
}

function getWebsite(signatureJSON){
    var signatureWebsite = signatureJSON.details.website;
    return signatureWebsite;
}

function getQuote(signatureJSON){
    var signatureQuote = signatureJSON.details.quote;
    return signatureQuote;
}

function getIsDefault(signatureJSON){
    var isDefault = signatureJSON.isDefault;
    return isDefault; //Returns a boolean
}

function removeSignatureByID(signatureList,IDNumber){
    signatureList.splice(IDNumber - 1,1);
}

function getSignatureByID(signatureList,IDNumber){
    var retrievedSignature =  signatureList[IDNumber - 1];
    return retrievedSignature
}

module.exports.getIDNumber = getIDNumber
module.exports.getFirstName = getFirstName
module.exports.getLastName = getLastName
module.exports.getTitle = getTitle
module.exports.getPhone = getPhone
module.exports.getWebsite = getWebsite
module.exports.getQuote = getQuote
module.exports.getIsDefault = getIsDefault
module.exports.extend = extend
module.exports.removeSignatureByID = removeSignatureByID
module.exports.getSignatureByID = getSignatureByID
