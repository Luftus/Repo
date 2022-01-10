const circle = document.getElementById('circle');
const bar = document.getElementById('bar');
const value = document.getElementById('v');
const minValSpan = document.getElementById('euro100');
const maxValSpan = document.getElementById('euro5000');
const donateInput = document.querySelector('#donate input');


const minVal = Number(minValSpan.innerText.replace('€', ''));
const maxVal = Number(maxValSpan.innerText.replace('€', ''));

let barRect = bar.getBoundingClientRect();
let barX = barRect.x;
let barMaxX = barX + barRect.width;
let circleRect = circle.getBoundingClientRect();
let circleX = circleRect.x;

let cursorX = 0;

document.addEventListener('resize', changeInitials);
donateInput.addEventListener('keyup', changeInput);
circle.addEventListener('mousedown', circlePress);
document.addEventListener('mouseup', circleRelease);
document.addEventListener('mousemove', updateMouse);


let isPressed = false;

function changeInitials(){
    barRect = bar.getBoundingClientRect();
    barX = barRect.x;
    barMaxX = barX + barRect.width;
    circleRect = circle.getBoundingClientRect();
    circleX = circleRect.x;
    cursorX = 0;
}

function changeInput(evt){
    //console.log("change");
    let nr = Number(evt.target.value);
    if(isNaN(nr) || nr < minVal){
        return;
    }
    let percentSlider = nr/maxVal;
    let minPix = circleX;
    let maxPix = barMaxX-circleRect.width;
    let diffPix = Math.floor(maxPix - minPix);
    let leftOffset = Math.floor(percentSlider * diffPix);
    if(nr > maxVal){
        circle.style.left = diffPix+'px';
    }
    else{
        circle.style.left = leftOffset+'px';
    }
    value.innerText = nr+ "€";
}

function updateMouse(evt){
    cursorX = evt.clientX;
    if(isPressed){
        if(cursorX <= circleX || cursorX >= (barMaxX-circleRect.width)){
            return;
        }
        let diff = Math.floor(cursorX - circleX);
        circle.style.left = diff+'px';
        let minPix = circleX;
        let maxPix = barMaxX-circleRect.width;
        let diffPix = Math.floor(maxPix - minPix);
        let percentMove = diff / diffPix;
        let val = Math.floor((maxVal - minVal) * percentMove) + minVal;
        value.innerText = val+ "€";
        donateInput.value = val;
    }

}

function circlePress(evt){
    //console.log('keydown', evt);
    circle.classList.add('pressed');
    isPressed = true;
}

function circleRelease(evt){
    //console.log('keyup', evt);
    circle.classList.remove('pressed');
    isPressed = false;
}
