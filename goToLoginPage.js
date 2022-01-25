// ==UserScript==
// @name         PCTA Permit Management - Go To Login Page
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Goes from the main landing page to the login portal
// @author       Chandler Forrest
// @match        https://permit.pcta.org/
// @icon         https://www.google.com/s2/favicons?domain=pcta.org
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  var continueButtons = document.getElementsByClassName("button");
  continueButtons[1].click();
})();