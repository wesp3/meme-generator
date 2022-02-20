"use strict";

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [],
};

var gMemes = _loadMemesFromLocalStorage();
if (!gMemes) gMemes = [];

function createLine(txt = "text", size = 40, color = "white", font = "Impact") {
  var align = {};

  switch (gMeme.lines.length) {
    case 0:
      align.x = 250;
      align.y = 50;
      break;

    case 1:
      align.x = 250;
      align.y = 450;
      break;

    case 2:
      align.x = 250;
      align.y = 250;
      break;
  }

  var line = {
    txt,
    size,
    align,
    color,
    font,
    isTextStroke: false,
    area: { startX: 50, endX: 400, startY: align.y, endY: align.y - 50 },
    isMarked: false,
  };
  gMeme.lines.push(line);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function getMeme() {
  return gMeme;
}

function getMemeImgId() {
  return gMeme.selectedImgId;
}

function getLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}

function setMemeIdx(selectedImgId, selectedLineIdx) {
  gMeme.selectedImgId = selectedImgId;
  gMeme.selectedLineIdx = selectedLineIdx;
}

function setMemeImgId(selectedImgId) {
  gMeme.selectedImgId = selectedImgId;
}

function setText(txt) {
  var line = gMeme.lines[gMeme.selectedLineIdx];
  line.txt = txt;
}

function setSize(num) {
  gMeme.lines[gMeme.selectedLineIdx].size += num;
}

function setFont(fontType) {
  gMeme.lines[gMeme.selectedLineIdx].font = fontType;
}

function setColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function NextText() {
  if (gMeme.lines.length < 3) {
    gMeme.selectedLineIdx++;
    createLine();
  }
}

function switchLines() {
  if (gMeme.selectedLineIdx === 0) {
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
  } else gMeme.selectedLineIdx--;
}

function removeLine() {
  gMeme.lines.splice([gMeme.selectedLineIdx], 1);
  gMeme.selectedLineIdx--;
}

function moveText(num) {
  gMeme.lines[gMeme.selectedLineIdx].align.y += num;
}

function alignLeft() {
  gMeme.lines[gMeme.selectedLineIdx].align.x = 50;
}

function alignCenter() {
  gMeme.lines[gMeme.selectedLineIdx].align.x = 250;
}

function alignRight() {
  gMeme.lines[gMeme.selectedLineIdx].align.x = 400;
}

function clearMeme() {
  gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [],
  };
}

function saveMeme() {
  if (gMemes.includes(gMeme)) {
    var index = gMemes.findIndex((meme) => meme === gMeme);
    gMemes[index] = gMeme;
  } else gMemes.push(gMeme);
  _saveMemesToLocalStorage();
}

function getMyMemes() {
  return gMemes;
}

function setMemeFromMyMeme(index) {
  gMeme = gMemes[index];
}

function _saveMemesToLocalStorage() {
  saveToLocalStorage("mymemesDB", gMemes);
}

function _loadMemesFromLocalStorage() {
  return loadFromLocalStorage("mymemesDB");
}
