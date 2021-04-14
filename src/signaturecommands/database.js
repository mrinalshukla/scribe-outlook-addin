//https://docs.microsoft.com/en-us/javascript/api/outlook/office.roamingsettings?view=outlook-js-preview
    //    saveAsync method to save any changes in JSON file 

/*var signatureListDB = Office.context.roamingSettings; //this is 'var _setting' from URL 
var signatureList = signatureListDB.get("signatureList") */

//This callback method is OPTIONAL.  Can be removed from .saveAsync().
function saveMyAppSettingsCallback(asyncResult) {
    if (asyncResult.status == Office.AsyncResultStatus.Failed) {
        // Handle the failure.
    }
} 

//TODO add a removeSignatureByID function

function extend (signatureList, signatureJSON){
    return newSignatureList = [signatureList,signatureJSON];
}

function saveSignature(){
    if (Office.context.roamingSettings.get("signatureList") !== undefined){
        setSignature();
    }
    else {
        setNewSignature();
    }
};

function setSignature (){
    var signatureList = Office.context.roamingSettings.get("signatureList");
    signatureList = JSON.parse(signatureList);

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var title = document.getElementById("title").value;
    var phone = document.getElementById("phone").value;
    var website = document.getElementById("website").value;
    var quote = document.getElementById("quote").value;
    var IDSignature = firstName + quote.substr(0,10);

    var signatureJSON = {
        "ID" : IDSignature,
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

    signatureList = extend(signatureList,signatureJSON); 
    Office.context.roamingSettings.set("signatureList", JSON.stringify(signatureList));
    Office.context.roamingSettings.saveAsync(function(result) {
        if (result.status !== Office.AsyncResultStatus.Succeeded) {
          console.error(`Action failed with message ${result.error.message}`);
        } else {
          console.log(`Settings saved with status: ${result.status}`);
        }
      });
}

function setNewSignature (){
    //var signatureList = {};

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var title = document.getElementById("title").value;
    var phone = document.getElementById("phone").value;
    var website = document.getElementById("website").value;
    var quote = document.getElementById("quote").value;
    var IDSignature = firstName + quote.substr(0,10);

    var signatureJSON = {
        "ID" : IDSignature,
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

    Office.context.roamingSettings.set("signatureList", JSON.stringify(signatureJSON));
    Office.context.roamingSettings.saveAsync(function(result) {
        if (result.status !== Office.AsyncResultStatus.Succeeded) {
          console.error(`Action failed with message ${result.error.message}`);
        } else {
          console.log(`Settings saved with status: ${result.status}`);
        }
      });
}

//https://www.w3schools.com/js/js_json_objects.asp on info for how get JSON objects

function getID(signatureJSON){
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
    if (signatureJSON.details.quote == null){
        return "Null";
    }
    var signatureQuote = signatureJSON.details.quote;
    return signatureQuote;
}

function getIsDefault(signatureJSON){
    var isDefault = signatureJSON.isDefault;
    return isDefault; //Returns a boolean
}

//TODO fix console.log
function clearList(){
    Office.context.roamingSettings.remove("signatureList");
    var signatureList = Office.context.roamingSettings.get("signatureList");
    if (signatureList.length == undefined){
        console.log("List has been cleared.");
    }
    else {
        console.log("List unable to be cleared.")
    }
}

function getSignatureByID(IDSignature){
    var signatureList = Office.context.roamingSettings.get("signatureList");
    signatureList = JSON.parse(signatureList);
    console.log(signatureList.length)

    for (i=0; i < signatureList.length; i++){
        var signatureJSON = signatureList[i];
        console.log(JSON.stringify(signatureJSON));
        if (getID(signatureJSON) == null){
            continue;
        }
        else if (getID(signatureJSON) == IDSignature){
            return signatureJSON;
        }
    }
    return "Signature does not exist.";
}

function returnSignatureList(){
    var signatureList = Office.context.roamingSettings.get("signatureList");
    //signatureList = JSON.parse(signatureList);
    return signatureList;
}

function returnSignatureByID(){
    //var signatureList = Office.context.roamingSettings.get("signatureList");

    var firstName = document.getElementById("firstName").value;
    var quote = document.getElementById("quote").value;
    var IDSignature = firstName + quote.substr(0,10);

    var returnedSignature = getSignatureByID(IDSignature);
    var signatureQuote = getQuote(returnedSignature);
    return signatureQuote;
}

module.exports.setSignature = setSignature
module.exports.getID = getID
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
module.exports.clearList = clearList 
