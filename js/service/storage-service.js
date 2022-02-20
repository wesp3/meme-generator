"use strict";

function saveToLocalStorage(key, val) {
  var json = JSON.stringify(val);
  localStorage.setItem(key, json);
}

function loadFromLocalStorage(key) {
  var stringJson = localStorage.getItem(key);
  var val = JSON.parse(stringJson);
  return val;
}
