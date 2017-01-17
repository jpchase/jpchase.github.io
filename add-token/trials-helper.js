"use strict";

var LongTaskToken = "AskgqD4TOQnfzHSqOQk1JuvALukPAm4X9GPpyCDoqzqrJUz5ijqvPSNgvkvOxt/otGgrss3eq0JHQnHWIXiWbgYAAABgeyJvcmlnaW4iOiAiaHR0cHM6Ly9qcGNoYXNlLmdpdGh1Yi5pbzo0NDMiLCAiZmVhdHVyZSI6ICJMb25nVGFza09ic2VydmVyIiwgImV4cGlyeSI6IDE0ODc4NjcxOTN9";
var USBToken = "Aj31RLNyXWXs+HfFd55f4IUSXkPnHRNwSKW4Pu1/D+VoaUQfZUDrS60nh4bPwUUXqhy4vz/dPCTaTqlKN5ApsQUAAABWeyJvcmlnaW4iOiAiaHR0cHM6Ly9qcGNoYXNlLmdpdGh1Yi5pbzo0NDMiLCAiZmVhdHVyZSI6ICJXZWJVU0IiLCAiZXhwaXJ5IjogMTQ4Nzg2NzE0Mn0=";

function addTrialToken(token) {
  var tokenElement = document.createElement('meta');
  tokenElement.httpEquiv = "origin-trial";
  tokenElement.content = token;
  document.getElementsByTagName('head')[0].appendChild(tokenElement);
}

function detectWebUSB() {
  if (navigator.usb) {
    console.log('WebUSB already enabled.');
    return true;
  }
  console.log('WebUSB is not yet enabled.');
  return false;
}

function tryWebUSB() {
  window.setTimeout(function() {
    if (!navigator.usb) {
      throw "No WebUSB support.";
    }
    navigator.usb.getDevices().then(devices => {
      console.log('Found devices:', devices);
      devices.map(device => {
        console.log(device.productName);      // "Arduino Micro"
        console.log(device.manufacturerName); // "Arduino LLC"
      });
    })
    .catch(error => console.log('Error getting devices:', error));
  }, 1);
}

function detectLongTaskObserver() {
  console.log('window.PerformanceLongTaskTiming, type = ', typeof window.PerformanceLongTaskTiming);
  if (window.PerformanceLongTaskTiming) {
    console.log('Long Task Observer already enabled.');
    return true;
  }
  console.log('Long Task Observer is not yet enabled.');
  return false;
}

function tryLongTaskObserver() {
  window.setTimeout(function() {
    if (!window.PerformanceLongTaskTiming) {
      throw "No Long Task Observer support.";
    }
    console.log('window.PerformanceLongTaskTiming, type = ', typeof window.PerformanceLongTaskTiming);
  }, 1);
}