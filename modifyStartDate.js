// ==UserScript==
// @name         PCTA Permit Management - Modify Start Date
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Scrolls through the Permit Calendar every 5-10 seconds, alerts whenever there's an open date, tries to grab a date if it matches target
// @author       Chandler Forrest
// @match        https://permit.pcta.org/manage/mpa-trip.php
// @icon         https://www.google.com/s2/favicons?domain=pcta.org
// @grant        none
// ==/UserScript==

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  const randomNum = Math.random() * (max - min) + min;
  console.log("Random num ", randomNum);
  return randomNum * 1000;
}

const AprilTargetDates = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const MayTargetDates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const debug = true;
const currentPermitMonth = "May";
const currentPermitDate = 22;

  (function () {
    'use strict';
    // Wait at least 2 seconds since the page takes a bit of time to load
    // Also conviently spaces out the time in-between refreshes
    setTimeout(() => {
      const availableDays = [];
      for (let monthCount = 0; monthCount <= 2; monthCount++) {
        // Get the month's name. 1 element
        const monthClass = document.getElementsByClassName("fc-left");
        if (monthClass.length == 0) {
          console.log("Month is having issues loading");
        }
        let month = monthClass[0].textContent;
        month = month.substring(0, month.length - 5);
        // Get the permit counts. Between 30-31 elements
        const permitCounts = document.getElementsByClassName("fc-content");
        if (permitCounts.length == 0) {
          console.log("permitCountDays is having issues loading");
          alert("Script isn't able to load the calendar at all!");
        }
        // Get the permit dates. Between 30-31 elements
        const permitDates = document.getElementsByClassName("fc-day-top");
        if (permitDates.length == 0) {
          console.log("permitDates is having issues loading");
          alert("Script isn't able to load the calendar at all!");
        }
        for (let dayNumber = 0; dayNumber < permitCounts.length; dayNumber++) {
          const permitCount = permitCounts[dayNumber].textContent;
          const permitDate = permitDates[dayNumber].textContent;
          if (debug) {
            console.log(month, dayNumber, permitCount)
          }
          // // Ensure that current permit date isn't selected
          // if (currentPermitMonth == "May" && permitDate == 22) {
          //     let daySquares = document.getElementsByClassName("fc-day");
          //     daySquares[dayNumber].classList.remove("");
          // }
          // Want to alert
          if (permitCount < 50) {
            availableDays.append({
              ts: Date.now(),
              month: month,
              permitDate: permitDate,
              permitCount: permitCount,
            })
          }
          // Try to get the date!!!
          // if (month == "April" && AprilTargetDates.includes(permitDate) || month == "May" && MayTargetDates.includes(permitDate)) {
          //     // Get the clickable elements for the dates. Between 30-31 elements
          //     const daySquares = document.getElementsByClassName("fc-day");
          //     if (daySquares.length == 0) {
          //         console.log("Issues getting the clickable dates")
          //         // Don't alert here! Still want to be able to grab the dates even if I can't grab them automatically.
          //     } else {
          //         // Offset the selection due to the blank squares
          //         const offset = month == "April" ? 4 : 0;
          //         // 'Select' the day
          //         daySquares[dayNumber + 5].classList.add("active-date");
          //         // Modify the trip!!!
          //         var modifyTripButton = document.getElementById('submit_modify_trip');
          //         modifyTripButton.click();
          //     }
          // }
        }
        const leftButton = document.getElementsByClassName("fc-prev-button fc-button fc-button-primary");
        if (leftButton.length == 0) {
          console.log("Left button on the calendar is borked!");
          alert("Script isn't finding the leftButton anymore!!");
        }
        leftButton[0].click();
      }
      if (availableDays.length > 0) {
        console.log(availableDays);
        alert(`Found some available dates! ${availableDays}`);
      }
      window.location.reload();
    }, getRandomArbitrary(5, 10));
  })();