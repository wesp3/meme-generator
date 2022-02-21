"use strict";

var gSortedImgs;
var gKeywords = [];
var gImgs = [
   { id: 1, url: "img/1.jpg", keywords: ["trump", "funny", "politics"] },
   { id: 2, url: "img/2.jpg", keywords: ["dog", "funny"] },
   { id: 3, url: "img/3.jpg", keywords: ["dog", "funny"] },
   { id: 4, url: "img/4.jpg", keywords: ["cat", "funny"] },
   { id: 5, url: "img/5.jpg", keywords: ["kid", "funny"] },
   { id: 6, url: "img/6.jpg", keywords: ["man", "funny"] },
   { id: 7, url: "img/7.jpg", keywords: ["kid", "funny"] },
   { id: 8, url: "img/8.jpg", keywords: ["man", "happy"] },
   { id: 9, url: "img/9.jpg", keywords: ["kid", "funny"] },
   { id: 10, url: "img/10.jpg", keywords: ["politics", "happy", "man"] },
   { id: 11, url: "img/11.jpg", keywords: ["sport", "funny", "man"] },
   { id: 12, url: "img/12.jpg", keywords: ["man", "funny"] },
   { id: 13, url: "img/13.jpg", keywords: ["man", "happy"] },
   { id: 14, url: "img/14.jpg", keywords: ["man", "sad"] },
   { id: 15, url: "img/15.jpg", keywords: ["man", "funny"] },
   { id: 16, url: "img/16.jpg", keywords: ["man", "funny"] },
   { id: 17, url: "img/17.jpg", keywords: ["man", "politics"] },
   { id: 18, url: "img/18.jpg", keywords: ["kid", "toy"] },
 ];

function getImages(tag) {
  gSortedImgs = gImgs.filter(item => item.keywords.indexOf(tag) > -1);
  if(gSortedImgs.length < 1){
    gSortedImgs = gImgs.slice();
  }
  return gSortedImgs;
}

function getKeyWords() {
  gImgs.forEach(function(el, i){
    var thesewords = el.keywords;
    gKeywords.push(thesewords);
  })
  gKeywords = gKeywords.flat();
  gKeywords = [...new Set(gKeywords)];

  return gKeywords;
}

function getImageById(imageId) {
  var image = gImgs.find((img) => {
    return img.id === +imageId;
  });
  return image;
}

function resetSort() {
  gSortedImgs = gImgs.slice();
}

//util function
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
