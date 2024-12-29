let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let btns = ["yellow","red","purple","green"];

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game is started");
        started = true;
        levelUp();
    }
});


function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },200);
}
function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let btn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor)
    btnFlash(btn);
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id"); 
    userSeq.push(userColor);
    checkAns(userSeq.length -1);
}
let AllBtns = document.querySelectorAll(`.btn`);
for(btn of AllBtns){
    btn.addEventListener("click",btnPress)
} 
function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp(),1000);
        }
    }else{
        h2.innerHTML = `Game Over!your score was <b>${level}</b><br> Press any key to restart`
        document.querySelector(`body`).style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector(`body`).style.backgroundColor = "white";
        },150);
        reset();
    }
}

function reset(){
     started = false;
     gameSeq =[];
     userSeq =[]; 
     level=0;
}