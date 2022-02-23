const jsCanvas = document.getElementById("jsCanvas");
const ctx = jsCanvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const remove = document.getElementById("jsRemove");
const saveBtn = document.getElementById("jsSave");
const eraser = document.getElementById("jsEraser");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
let painting = false;
let filling = false;
let erasing = false;
/*canvas는 css 사이즈와 pixel 사이즈를 가져야함 
    pixel manipulation */
jsCanvas.width = CANVAS_SIZE;
jsCanvas.height = CANVAS_SIZE;
/*added background*/
ctx.fillStyle = "white";
ctx.fillRect(0, 0, jsCanvas.width, jsCanvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = "2.5";
//ctx.fillStyle = "green";
//ctx.fillRect(50, 20, 100, 49);

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  /* offsetX,Y: canvas의 좌표를 가져옴 
clientX,Y: 윈도우 전체의 좌표를 가져옴 */

  if (!painting) {
    //painting이 false일때 시작점을 체크해줌
    //console.log("creating path in " + x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    //painting이 true일때 라인을 그리기 시작.
    //마우스를 움직이는 내내 발생하는 것! path는 라인이다!
    //console.log("creating line in " + x, y);
    ctx.lineTo(x, y); //connects the last point in the current path
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
  //  console.log(event.target.value);
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    erasing = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    erasing = false;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (!erasing) {
    if (filling) {
      ctx.fillRect(0, 0, jsCanvas.width, jsCanvas.height);
    }
  }
}

function handleRemoveClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, jsCanvas.width, jsCanvas.height);
}

function handleCM(event) {
  event.preventDefault();
  //prevent right mouse click;
}

function handleSaveClick() {
  const image = jsCanvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click(); //fake click을 만들어줌
  //console.log(link);
}

function handleEraserClick() {
  erasing = true;
  if (filling === true) {
    filling = false;
  }
  ctx.strokeStyle = "white";
}

if (jsCanvas) {
  jsCanvas.addEventListener("mousemove", onMouseMove);
  jsCanvas.addEventListener("mousedown", startPainting);
  jsCanvas.addEventListener("mouseup", stopPainting);
  jsCanvas.addEventListener("mouseleave", stopPainting);
  jsCanvas.addEventListener("click", handleCanvasClick);
  jsCanvas.addEventListener("contextmenu", handleCM);
}

//Array.from() object로부터 array를 생성한다
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (remove) {
  remove.addEventListener("click", handleRemoveClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (eraser) {
  eraser.addEventListener("click", handleEraserClick);
}
