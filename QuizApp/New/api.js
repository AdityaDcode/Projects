const topic = document.getElementById("topic");
const queLevel = document.getElementById("level");
const number = document.getElementById("numberOfQue");
const form = document.getElementById("quizForm");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let sTopic;
let level;
let num;
let link;
let apiurl="";
let queAll=[];
function select(){
     sTopic = topic.value;
     level = queLevel.value;
     num = number.value;
     link = "https://the-trivia-api.com/api/questions?limit="+`${num}`+"&categories="+`${sTopic}`+"&difficulty="+`${level}`;
      apiurl = link
}
form.addEventListener("submit",function(event){
    event.preventDefault();
    select();
    fetchQuestions();
})

async function fetchQuestions() {
  const response = await fetch(apiurl);
  if(response.status == 404){
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
}else{
  var que = await response.json();
  // questionElement.innerHTML=que[0].question;
  que.forEach((que1,index)=>{
    let arr=[]
    arr.push({text:que1.incorrectAnswers[0],correct:false},{text:que1.incorrectAnswers[1],correct:false},{text:que1.incorrectAnswers[2],correct:false});
    let crctAnsIdx=Math.floor(Math.random()*4)
    arr.splice(crctAnsIdx,0,{text:que1.correctAnswer,correct:true});
    queAll = await 
    let currentQuestionIndex =0;
    let score =0;

function startQuiz(){
    currentQuestionIndex=0;
    score =0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
  resetState();
  questionElement.innerHTML=que[currentQuestionIndex].question;
  let questionNo = currentQuestionIndex+1;
  // questionElement.innerHTML = questionNo+". "+currentQuestion.question;
  arr.forEach(answer =>{
      const button = document.createElement("button");
      console.log(answer.text);
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if(answer.correct){
          button.dataset.correct = answer.correct;
      }
      button.addEventListener("click",selectAnswer);
  })
}
function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild);
  }
}

  });
}
}



// let currentQuestionIndex =0;
// let score =0;

// function startQuiz(){
//     currentQuestionIndex=0;
//     score =0;
//     nextButton.innerHTML = "Next";
//     showQuestion();
// }
// function showQuestion(){
//   resetState();
//   let currentQuestion = que[currentQuestionIndex].question;
//   let questionNo = currentQuestionIndex+1;
//   questionElement.innerHTML = questionNo+". "+currentQuestion.question;
//   currentQuestion.answers.forEach(answer =>{
//       const button = document.createElement("button");
//       button.innerHTML = answer.text;
//       button.classList.add("btn");
//       answerButtons.appendChild(button);
//       if(answer.correct){
//           button.dataset.correct = answer.correct;
//       }
//       button.addEventListener("click",selectAnswer);
//   })
// }
// function resetState(){
//   nextButton.style.display = "none";
//   while(answerButtons.firstChild){
//       answerButtons.removeChild(answerButtons.firstChild);
//   }
// }
