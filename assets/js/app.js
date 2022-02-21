const jsCanvas = document.getElementById("jsCanvas");
const ctx = jsCanvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

let painting = false;
let filling = false;

/*canvas는 css 사이즈와 pixel 사이즈를 가져야함 
    pixel manipulation */
jsCanvas.width = 700;
jsCanvas.height = 700;
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = "2.5";
ctx.fillRect(50, 20, 100, 49);

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
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
  //  console.log(event.target.value);
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function fillCanvas() {}

if (jsCanvas) {
  jsCanvas.addEventListener("mousemove", onMouseMove);
  jsCanvas.addEventListener("mousedown", startPainting);
  jsCanvas.addEventListener("mouseup", stopPainting);
  jsCanvas.addEventListener("mouseleave", stopPainting);
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
