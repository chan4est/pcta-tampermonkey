// ==UserScript==
// @name         PCTA Permit Management - Change Trip Details
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Presses the 'Change Trip Details' button after loging into the PCTA website
// @author       Chandler Forrest
// @match        https://permit.pcta.org/manage/mpa-dashboard.php
// @icon         https://www.google.com/s2/favicons?domain=pcta.org
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  var changeTripDetails = document.getElementById('modify_trip_permit_request_button');
  changeTripDetails.click();
})();