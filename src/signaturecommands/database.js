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

function extend (signatureList, signatureJSON){
    signatureList.push(signatureJSON);
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

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var title = document.getElementById("title").value;
    var phone = document.getElementById("phone").value;
    var website = document.getElementById("website").value;
    var quote = document.getElementById("quote").value;
    var signatureIDValue = document.getElementById("signatureID").value;
    if (signatureIDValue == ""){
        signatureID = "Signature " + (signatureList.length + 1);
    }
    else {
        signatureID = signatureIDValue;
    }

    var signatureJSON = {
        "ID" : signatureID,
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

    extend(signatureList,signatureJSON); 
    Office.context.roamingSettings.set("signatureList", signatureList);
    Office.context.roamingSettings.saveAsync(function(result) {
        if (result.status !== Office.AsyncResultStatus.Succeeded) {
          console.error(`Action failed with message ${result.error.message}`);
        } else {
          console.log(`Settings saved with status: ${result.status}`);
          addItemToDropdown();
        }
      });
}

function setNewSignature (){
    var signatureList = Office.context.roamingSettings.get("signatureList");

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var title = document.getElementById("title").value;
    var phone = document.getElementById("phone").value;
    var website = document.getElementById("website").value;
    var quote = document.getElementById("quote").value;
    var signatureIDValue = document.getElementById("signatureID").value;
    if (signatureIDValue == ""){
        signatureID = "Signature " + (signatureList.length + 1);
    }
    else {
        signatureID = signatureIDValue;
    }

    var signatureJSON = [{
        "ID" : signatureID,
        "details": {
            "firstName" : firstName,
            "lastName" : lastName,
            "title" : title,
            "phone" : phone,
            "website" : website,
            "quote" : quote
        },
        "isDefault" : false
    }]

    Office.context.roamingSettings.set("signatureList", signatureJSON);
    Office.context.roamingSettings.saveAsync(function(result) {
        if (result.status !== Office.AsyncResultStatus.Succeeded) {
          console.error(`Action failed with message ${result.error.message}`);
        } else {
          console.log(`Settings saved with status: ${result.status}`);
          addItemToDropdown();
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
    if (signatureJSON == "Signature does not exist."){
        return "Signature does not exist.";
    }
    else{
        if (signatureJSON.details.quote == null){
            return "Null";
        }
        var signatureQuote = signatureJSON.details.quote;
        return signatureQuote;
    }
}

function getIsDefault(signatureJSON){
    var isDefault = signatureJSON.isDefault;
    return isDefault; //Returns a boolean
}

function clearList(){
    Office.context.roamingSettings.remove("signatureList");
    Office.context.roamingSettings.saveAsync(function(result) {
        if (result.status !== Office.AsyncResultStatus.Succeeded) {
          console.error(`Action failed with message ${result.error.message}`);
        } else {
          console.log(`Settings saved with status: ${result.status}`);
        }
      });
    var signatureList = Office.context.roamingSettings.get("signatureList");
}

function getSignatureByID(signatureID){
    var signatureList = Office.context.roamingSettings.get("signatureList");

    for (i=0; i < signatureList.length; i++){
        var signatureJSON = signatureList[i];
        if (getID(signatureJSON) == null){
            continue;
        }
        else if (getID(signatureJSON) == signatureID){
            return signatureJSON;
        }
    }
    return "Signature does not exist.";
}

function returnSignatureList(){
    var signatureList = Office.context.roamingSettings.get("signatureList");
    signatureList = JSON.stringify(signatureList);
    return signatureList;
}

function returnSignatureByID(){
    var signatureList = Office.context.roamingSettings.get("signatureList");
    var quote = document.getElementById("quote").value;

    if (signatureList == undefined && quote == ""){
        return "Signature list does not exist and no values in text boxes.";
    }
    else if (signatureList == undefined && quote != ""){
        saveSignature(); //Maybe take this out.  Check with team.  Maybe do a pop up that asks to save
        return quote;
    }
    else{
        if(signatureList.length !=0){
            var signatureID = document.getElementById("signatureDropdown").value;
            var returnedSignature = getSignatureByID(signatureID);
            var signatureQuote = getQuote(returnedSignature);
            return signatureQuote;
        }
        return "Signature list does not exist.";
    }
}

function removeSignatureByID(){
    var signatureList = Office.context.roamingSettings.get("signatureList");

    var signatureID = document.getElementById("signatureDropdown").value;
    var returnedSignature = getSignatureByID(signatureID);
    var indexOfSignature = signatureList.indexOf(returnedSignature);

    removeItemFromDropdown(returnedSignature);
    signatureList.splice(indexOfSignature,1);

    Office.context.roamingSettings.saveAsync(function(result) {
        if (result.status !== Office.AsyncResultStatus.Succeeded) {
          console.error(`Action failed with message ${result.error.message}`);
        } else {
          console.log(`Settings saved with status: ${result.status}`);
        }
      });
}

function addItemToDropdown(){
    var signatureList = Office.context.roamingSettings.get("signatureList");
    var signatureID = getID(signatureList[signatureList.length - 1]);
    var option = document.createElement("option");
    option.value = signatureID;
    option.innerHTML = signatureID;
    signatureDropdown.appendChild(option);
}

function removeItemFromDropdown(returnedSignature){
    var signatureList = Office.context.roamingSettings.get("signatureList");
    var indexOfSignature = signatureList.indexOf(returnedSignature);
    var signatureDropdown = document.getElementById("signatureDropdown");;
    signatureDropdown.remove(indexOfSignature + 1);
}

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
module.exports.returnSignatureTitleLoop = returnSignatureTitleLoop 