
const canvas = document.getElementById("jsCanvas");
//캔버스 안에 픽셀을 다룸  *3d도 가능
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 250;



//캔버스 실제 픽셀사이즈 지정
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;    //라인색

ctx.fillStyle = INITIAL_COLOR;  //배경색

ctx.lineWidth = 2;  //라인두께

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

//마우스를 클릭했을 때는 true가 되는 플래그
function startPainting(){
    painting = true;
}

//움직임을 감지
function onMouseMove(event){
    //캔버스 안에서의 마우스 위치값 offset
    const x = event.offsetX;
    const y = event.offsetY;
    //path line을 만듬
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y)
    } else {
        //직선으로 라인
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

//라인색상 체인지
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        //x , y , width, height
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
//기본 이미지 저장기능 막기
function handleCM(event){
    event.preventDefault();
}

//이미지 저장
function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

//캔버스가 존재하는지 확인
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    //캔버스를 클릭했을 때 painting을 시작 /mousedown클릭했을 때 발생하는 이벤트 손을 떼지않았을 때
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    //마우스가 캔버스에서 나가면 painting이 false 가 되도록 설정
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    //저장기능 contextmenu
    canvas.addEventListener("contextmenu", handleCM);
}

//객체로부터 배열을 만드는 메소드 Array.from()
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}