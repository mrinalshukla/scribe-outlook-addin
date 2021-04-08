//URL -- https://developer.chrome.com/docs/extensions/reference/storage/
//URL -- https://docs.microsoft.com/en-us/office/dev/add-ins/develop/persisting-add-in-state-and-settings
    //    saveAsync method to save any changes in JSON file

//sample JSON
database = [{
    "ID" : 1,
    "details": {
        "first_name" : 'Juan',
        "last_name" : 'Ruiz',
        "title" : 'Student',
        "phone" : '720-***-****',
        "website" : 'sample---.com',
        "quote" : '"The greatest wealth is to live content with little." - Plato'
    },
    "is_default" : true
}]

databaseFromChrome = chrome.storage.sync.set('signaturelist', "I dont know what to put here");

function getSignatureById(){
    signature = database.details.quote;
}

  //chrome.storage.sync.get()