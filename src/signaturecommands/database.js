//URL -- https://docs.microsoft.com/en-us/office/dev/add-ins/develop/persisting-add-in-state-and-settings
    //    saveAsync method to save any changes in JSON file

var signatureListDB = Office.context.roamingSettings; //this is 'var _setting' from URL 

//This callback method is OPTIONAL.  Can be removed from .saveAsync().
function saveMyAppSettingsCallback(asyncResult) {
    if (asyncResult.status == Office.AsyncResultStatus.Failed) {
        // Handle the failure.
    }
}

function setSignature (){
    //TODO have this value change with signatureListDB.  Maybe something like signatureListDB.length() (if .length method exists)
    var IDNumber = 1; 
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var title = document.getElementById("title").value;
    var phone = document.getElementById("phone").value;
    var website = document.getElementById("website").value;
    var quote = document.getElementById("quote").value;
    if (IDNumber == 1){
        var signatureJSON_String = `{
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
        }`
    }
    else {
        var signatureJSON_String = `{
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
        }`
    }
    var signatureJSON = JSON.parse(signatureJSON_String) //https://www.w3schools.com/js/js_json.asp for JSON.parse
    signatureList = $.extend({},signatureJSON); //Adds new signatureJSON into the existing signatureList. See  https://stackoverflow.com/questions/736590/add-new-attribute-element-to-json-object-using-javascript
    signatureListDB.set("signatureList", signatureList);
    signatureListDB.saveAsync(saveMyAppSettingsCallback);
}

//https://www.w3schools.com/js/js_json_objects.asp on info for how get JSON objects
//TODO Review if these get function will work.  Might need to do signatureListDB.get('signatureList',signatureJSON)

function getIDNumber(){
    var signatureID = signatureListDB.get(signatureJSON.ID);
    return signatureID;
}

function getFirstName(){
    var signatureFirstName = signatureListDB.get(signatureJSON.details.firstName);
    return signatureFirstName;
}

function getLastName(){
    var signatureLastName = signatureListDB.get(signatureJSON.details.lastName);
    return signatureLastName;
}

function getTitle(){
    var signatureTitle = signatureListDB.get(signatureJSON.details.title);
    return signatureTitle;
}

function getPhone(){
    var signaturePhone = signatureListDB.get(signatureJSON.details.Phone);
    return signaturePhone;
}

function getWebsite(){
    var signatureWebsite = signatureListDB.get(signatureJSON.details.Website);
    return signatureWebsite;
}

function getQuote(){
    var signatureQuote = signatureListDB.get(signatureJSON.details.Quote);
    return signatureQuote;
}

function getIsDefault(){
    var signatureQuote = signatureListDB.get(signatureJSON.isDefault);
    return isDefault;
}
