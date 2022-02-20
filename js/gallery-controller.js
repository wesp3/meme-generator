"use strict";

function onInit() {
  renderGrid();
  renderKeyWords();
  initCanvas();
  enterSearchListener();
}

var navigation = document.querySelector('nav ul');
var opa = document.querySelector('.nav-opacity');
var navExpanded = false;
var hamburger = document.querySelector('.menu');
var ismobile;

function mobileNav(){

  if(ismobile){
    // console.log(ismobile);
    hamburger.classList.toggle('opened')
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('opened'));

    if(!navigation.classList.contains('transition')){
      navigation.classList.add('transition');
    }

    if(!navExpanded){
      navigation.classList.add('expand');
      opa.classList.add('overlay');
    } else if(navExpanded){
      navigation.classList.remove('expand');
      opa.classList.remove('overlay');
    }

    navExpanded = !navExpanded;
    // console.log(navExpanded);
  }

}

const mediaQuery = window.matchMedia('(min-width: 768px)')

function handleTabletChange(e) {
  if (e.matches) {
    ismobile = false;
    // console.log('desktop');
    navigation.classList.remove('transition');
    opa.classList.remove('overlay');
  } else if(!e.matches){
    ismobile = true;
    // console.log('mobile');
    if(navExpanded){
      // console.log('adding overlay');
      opa.classList.add('overlay');
    }
  }
}

// Register event listener
mediaQuery.addListener(handleTabletChange)

// Initial check
handleTabletChange(mediaQuery)

var htmlStr;

function changeFontSize(growing) {
  var computedStyle = window.getComputedStyle
        ? getComputedStyle(growing) // Standards
        : growing.currentStyle;     // Old IE
  var fontSize;

  if (computedStyle) { // This will be true on nearly all browsers
      fontSize = parseFloat(computedStyle && computedStyle.fontSize);
      fontSize += 5;
      growing.style.fontSize = fontSize + "px";
  }
}

function tagClick(tag, el){
  renderGrid(tag);
  var tagid = document.getElementById(el.id);
  changeFontSize(tagid);
}

function renderGrid(tag) {
  var images = getImages(tag);
  var elGalleryContainer = document.querySelector(".gallery-container");
  htmlStr = images.map((image) => {
    return `<img src="${image.url}" class="img" id="${image.id}" onclick="onImageClick('${image.id}')">`;
  });
  elGalleryContainer.innerHTML = htmlStr.join("");
}

function renderKeyWords() {
  var elKeyWordsContainer = document.querySelector(".key-words-list");
  var keywords = getKeyWords();
  var strHTML = "";

  keywords.forEach(function(el, i){
    var liHTML = `<li id="tag-${i}" class="tag" onclick="tagClick('${el}', this)"> ${el}</li> `;
    strHTML += liHTML;
  })

  elKeyWordsContainer.innerHTML = strHTML;
}

function renderMyMemes() {
  var images = getImages();
  var memes = getMyMemes();
  var elGalleryContainer = document.querySelector(".gallery-container");
  var htmlStrArray = memes.map((meme, index) => {
    return `<img src="${
      images[meme.selectedImgId - 1].url
    }" class="img" id="${index}" onclick="onMemeClick('${index}')">`;
  });
  elGalleryContainer.innerHTML = htmlStrArray.join("");
}

function onImageClick(imageId) {
  setMemeImgId(imageId);
  drawImgFromlocal(imageId);
  setTimeout(function () {
    document.querySelector(".search-bar").style.display = "none";
    document.querySelector("main").style.display = "none";
    document.querySelector(".canvas-btn-container").style.display = "flex";
    resizeCanvas();
  }, 1);
}

function onMemeClick(memeId) {
  setMemeFromMyMeme(memeId);
  drawLinesImgs();
  document.querySelector("main").style.display = "none";
  document.querySelector(".canvas-btn-container").style.display = "flex";
}

function showGallery() {
  mobileNav();
  resetSort();
  renderGrid();
  document.querySelector(".search-bar").style.display = "flex";
  document.querySelector("main").style.display = "block";
  document.querySelector(".canvas-btn-container").style.display = "none";
  onClear();
  clearMeme();
}

function showMemes() {
  mobileNav();
  document.querySelector("main").style.display = "block";
  document.querySelector(".canvas-btn-container").style.display = "none";
  document.querySelector(".search-bar").style.display = "none";
  renderMyMemes();
  onClear();
  clearMeme();
}

function search() {
  var word = document.querySelector("#search-input").value;
  word = word.toLowerCase();
  if(gKeywords.includes(word)){
    renderGrid(word);
  }
}

function enterSearchListener(){
  var input = document.getElementById("search-input");
  input.addEventListener("keyup", function(event) {

    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      event.preventDefault();
      search();
    }
}); 
}


