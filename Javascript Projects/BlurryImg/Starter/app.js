const loadText = document.querySelector(".loadText");
const bg = document.querySelector('.bg');

let load =0;
let int = setInterval(blurring,30);
function blurring(){
    load++
    if(load>99){
        clearInterval(int);
    }
    loadText.innerText = `${load}%`;
    loadText.style.opacity = scale(load,0,100,1,0);
    bg.style.filter = `blur(${scale(load,0,100,30,0)}px)`;
}
//Function to map range of numbers to another given by stackoverflow
function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
