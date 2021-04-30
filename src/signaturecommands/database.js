//https://docs.microsoft.com/en-us/javascript/api/outlook/office.roamingsettings?view=outlook-js-preview
    //    saveAsync method to save any changes in JSON file 

const taskpane = require('../taskpane/taskpane.js');

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
    var signatureIdValue = document.getElementById("signatureId").value;
    if (signatureIdValue == ""){
        signatureId = "Signature " + (signatureList.length + 1);
    }
    else {
        signatureId = signatureIdValue;
    }

    var signatureJSON = {
        "Id" : signatureId,
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
    var signatureIdValue = document.getElementById("signatureId").value;
    if (signatureIdValue == ""){
        signatureId = "Signature " + (signatureList.length + 1);
    }
    else {
        signatureId = signatureIdValue;
    }

    var signatureJSON = [{
        "Id" : signatureId,
        "details": {
            "firstName" : firstName,
            "lastName" : lastName,
            "title" : title,
            "phone" : phone,
            "website" : website,
            "quote" : quote
        },
        "isDefault" : true
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

function getId(signatureJSON){
    var signatureId = signatureJSON.Id;
    return signatureId;
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

function getSignatureById(signatureId){
    var signatureList = Office.context.roamingSettings.get("signatureList");

    for (i=0; i < signatureList.length; i++){
        var signatureJSON = signatureList[i];
        if (getId(signatureJSON) == null){
            continue;
        }
        else if (getId(signatureJSON) == signatureId){
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

function returnSignatureById(){
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
            var signatureId = document.getElementById("signatureDropdown").value;
            var returnedSignature = getSignatureById(signatureId);
            var signatureQuote = getQuote(returnedSignature);
            return signatureQuote;
        }
        return "Signature list does not exist.";
    }
}

function removeSignatureById(){
    var signatureList = Office.context.roamingSettings.get("signatureList");

    var signatureId = document.getElementById("signatureDropdown").value;
    var returnedSignature = getSignatureById(signatureId);
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
    var signatureId = getId(signatureList[signatureList.length - 1]);
    var currentSignature = getSignatureById(signatureId);
    var defaultValue = getIsDefault(currentSignature);
    var option = document.createElement("option");

    option.value = signatureId;
    option.innerHTML = signatureId;
    signatureDropdown.appendChild(option); 
    
}

function removeItemFromDropdown(returnedSignature){
    var signatureList = Office.context.roamingSettings.get("signatureList");
    var indexOfSignature = signatureList.indexOf(returnedSignature);
    var signatureDropdown = document.getElementById("signatureDropdown");;
    signatureDropdown.remove(indexOfSignature + 1);
}

function populateTextbox() {
    var signatureId = document.getElementById("signatureDropdown").value;
    var returnedSignature = getSignatureById(signatureId);

    var firstName = getFirstName(returnedSignature);
    var lastName = getLastName(returnedSignature);
    var title = getTitle(returnedSignature);
    var phone = getPhone(returnedSignature);
    var website = getWebsite(returnedSignature);
    var quote = getQuote(returnedSignature);
    var defaultVal = getIsDefault(returnedSignature);

    document.getElementById("firstName").value = firstName;
    document.getElementById("lastName").value = lastName;
    document.getElementById("title").value = title;
    document.getElementById("phone").value = phone;
    document.getElementById("website").value = website;
    document.getElementById("quote").value = quote;
    document.getElementById("signatureId").value = signatureId;
  }

function setDefault(){
    var signatureList = Office.context.roamingSettings.get("signatureList");
    var signatureId = document.getElementById("signatureDropdown").value;
    var returnedSignature = getSignatureById(signatureId);
    var indexOfSignature = signatureList.indexOf(returnedSignature);

    var firstName = getFirstName(returnedSignature);
    var lastName = getLastName(returnedSignature);
    var title = getTitle(returnedSignature);
    var phone = getPhone(returnedSignature);
    var website = getWebsite(returnedSignature);
    var quote = getQuote(returnedSignature);

    for (var i=0; i < signatureList.length; i++){
        var signatureDefaultValue = getIsDefault(signatureList[i]);
        if (signatureDefaultValue == true){
            var signatureId = getId(signatureList[i]);
            var firstName = getFirstName(signatureList[i]);
            var lastName = getLastName(signatureList[i]);
            var title = getTitle(signatureList[i]);
            var phone = getPhone(signatureList[i]);
            var website = getWebsite(signatureList[i]);
            var quote = getQuote(signatureList[i]);

            var updatedSignature = {
                "Id" : signatureId,
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
            signatureList.splice(i,1,updatedSignature)
        }
    }

    var updatedSignature = {
        "Id" : signatureId,
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

    signatureList.splice(indexOfSignature,1,updatedSignature)

    Office.context.roamingSettings.set("signatureList", signatureList);
    Office.context.roamingSettings.saveAsync(function(result) {
        if (result.status !== Office.AsyncResultStatus.Succeeded) {
            console.error(`Action failed with message ${result.error.message}`);
        } else {
            console.log(`Settings saved with status: ${result.status}`);
        }
        });
}

module.exports.getId = getId
module.exports.getFirstName = getFirstName
module.exports.getLastName = getLastName
module.exports.getTitle = getTitle
module.exports.getPhone = getPhone
module.exports.getWebsite = getWebsite
module.exports.getQuote = getQuote
module.exports.getIsDefault = getIsDefault
module.exports.extend = extend
module.exports.removeSignatureById = removeSignatureById
module.exports.getSignatureById = getSignatureById 
module.exports.clearList = clearList 
module.exports.populateTextbox = populateTextbox
module.exports.setDefault = setDefault
