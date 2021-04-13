/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

// images references in the manifest
import "../../assets/icon-16.png";
import "../../assets/icon-32.png";
import "../../assets/icon-80.png";

/* global document, Office */

Office.onReady(info => {
    if (info.host === Office.HostType.Outlook) {
        document.getElementById("sideload-msg").style.display = "none";
        document.getElementById("app-body").style.display = "flex";
        //document.getElementById("edit_signature_popup").onclick = run;
        //document.getElementById("add_signature").onclick = applySignature;
        //document.getElementById("edit_signature_popup").onclick =  displaySignatures;
  }
});

export async function run() {
  //Found at https://javascript.info/popup-windows
  const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
  width=0,height=0,left=-1000,top=-1000`;
  open('https://localhost:3000/src/editsignatures/editsignatures.html', 'test', params);
}

function applySignature() {
  //Inserts a hardcoded signature at cursor position
  Office.context.mailbox.item.body.setSelectedDataAsync("Chase Perez - Team 4 Polaris");
}
