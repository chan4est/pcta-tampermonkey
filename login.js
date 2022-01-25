// ==UserScript==
// @name         PCTA Permit Management - Login
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Logs into the PCTA Permit Management System
// @author       Chandler Forrest
// @match        https://permit.pcta.org/manage/
// @icon         https://www.google.com/s2/favicons?domain=pcta.org
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const creds = {
    permitId: "",
    email: "",
    zip: "",
  }
  var permitId = document.getElementById('permit_id');
  var email = document.getElementById('email');
  var zip = document.getElementById('zip');
  var submit = document.getElementById('submit');
  permitId.value = creds.permitId;
  email.value = creds.email;
  zip.value = creds.zip;
  submit.click();
})();