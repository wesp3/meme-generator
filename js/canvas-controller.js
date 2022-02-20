"use strict";

var gElCanvas;
var gCtx;
var gDrawValues = {
  color: "black",
  isClicked: false,
};
var gDragMove = false;
var gLineGrabbed = null;

function initCanvas() {
  gElCanvas = document.querySelector(".meme-canvas");
  gCtx = gElCanvas.getContext("2d");
  addEventListeners();
}

function addEventListeners() {
  gElCanvas.addEventListener("mousedown", onDown);
  gElCanvas.addEventListener("mouseup", onUp);
  gElCanvas.addEventListener("mouseleave", onUp);
  gElCanvas.addEventListener("mousemove", onMove);

  gElCanvas.addEventListener("touchstart", onDown);
  gElCanvas.addEventListener("touchmove", onMove);
  gElCanvas.addEventListener("touchend", onUp);
}

function drawLinesImgs() {
  drawImgFromlocal(getMemeImgId());
  var txt = document.querySelector("#text-input").value;
  if (getMeme().lines.length === 0) createLine(txt);

  setText(txt);

  setTimeout(function () {
    for (var i = 0; i < getMeme().lines.length; i++) {
      var { txt, size, align, color, font } = getMeme().lines[i];
      gCtx.beginPath();
      gCtx.lineWidth = 2;
      gCtx.strokeStyle = "black";
      gCtx.fillStyle = color;
      gCtx.font = `${size}px ${font}`;
      gCtx.fillText(txt, align.x, align.y);
      if (getMeme().lines[i].isTextStroke)
        gCtx.strokeText(txt, align.x, align.y);
      if (getMeme().lines[i].isMarked) {
        gCtx.rect(50, getMeme().lines[i].align.y, 400, -30);
        gCtx.stroke();
      }
    }
  }, 1);
}

function onClear() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function resizeCanvas() {
  const elContainer = document.querySelector(".canvas-container");
  gElCanvas.width = elContainer.offsetWidth;
  drawImgFromlocal(getMemeImgId());
  drawLinesImgs();
}

function drawImgFromlocal(imageId) {
  var img = new Image();
  var image = getImageById(imageId);
  img.src = image.url;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
  };
}

function onDown(ev) {
  gDrawValues.isClicked = true;
}

function onMove(ev) {
  mouseEvOnCanvas(ev);
}

function onUp(ev) {
  gDrawValues.isClicked = false;
  var lines = getMeme().lines;

  for (var i = 0; i < lines.length; i++) {
    lines[i].isMarked = false;
  }

  drawLinesImgs();
}

function getLinesPosition(meme) {
  var linesPos = [];
  for (var i = 0; i < meme.lines.length; i++) {
    linesPos.push({
      line: meme.lines[i],
      x: meme.lines[i].align.x,
      y: meme.lines[i].align.y,
    });
  }
  return linesPos;
}

function mouseEvOnCanvas(ev) {
  ev.preventDefault();

  var offsetX = ev.offsetX;
  var offsetY = ev.offsetY;

  if (ev.type === "touchmove") {
      offsetX = ev.targetTouches[0].clientX;
      offsetY = ev.targetTouches[0].clientY;
  }

  var meme = getMeme();
  var linesPos = getLinesPosition(meme);

  for (var i = 0; i < linesPos.length; i++) {
      if (offsetY < linesPos[i].y + 50 && offsetY > linesPos[i].y - 80) {
          gElCanvas.style.cursor = "pointer";
          gDragMove = true;
          gLineGrabbed = linesPos[i].line;
          gLineGrabbed.isMarked = true;
          break;
      } else {
          gDragMove = false;
          gElCanvas.style.cursor = "default";
          if (gLineGrabbed) gLineGrabbed.isMarked = false;
      }
  }

  if (gDrawValues.isClicked && gDragMove) {
      gElCanvas.style.cursor = "grab";
      if (gLineGrabbed) {
          gLineGrabbed.align.x = offsetX - 50;
          gLineGrabbed.align.y = offsetY + 10;
      }
      drawLinesImgs();
  }
}

function onRemoveLine() {
  if (getMeme().selectedLineIdx === 0)
    document.querySelector("#text-input").value = "";
  else removeLine();
  drawLinesImgs();
}

function onColorPick() {
  gDrawValues.color = document.querySelector("#selected-color").value;
  setColor(gDrawValues.color);
  drawLinesImgs();
}

function onIncreaseFontSize() {
  setSize(5);
  drawLinesImgs();
}

function onDecreaseFontSize() {
  setSize(-5);
  drawLinesImgs();
}

function onFontSelect(fontType) {
  setFont(fontType);
  drawLinesImgs();
}

function onSetTextStroke() {
  getLine().isTextStroke = !getLine().isTextStroke;
  drawLinesImgs();
}

function onGoUp() {
  moveText(-10);
  drawLinesImgs();
}

function onGoDown() {
  moveText(+10);
  drawLinesImgs();
}

function onAlignLeft() {
  alignLeft();
  drawLinesImgs();
}

function onAlignCenter() {
  alignCenter();
  drawLinesImgs();
}

function onAlignRight() {
  alignRight();
  drawLinesImgs();
}

function onNextText() {
  document.querySelector("#text-input").value = "";
  NextText();
}

function onSwitchLines() {
  switchLines();
  document.querySelector("#text-input").value = getLine().txt;
}

function onDownloadImg(elLink) {
  const data = gElCanvas.toDataURL();
  elLink.href = data;
  elLink.download = "yourMEME.jpeg";
}

function onSaveMeme() {
  saveMeme();
}
