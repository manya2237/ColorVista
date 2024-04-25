const questions=[
    {image:"ishihara plates\Ishihara-Plate-8.jpg",answer:"8"},
    {image:"ishihara plates\Ishihara-Plate-5.jpg",answer:"5"},
    {image:"ishihara plates\Ishihara-Plate-16.jpg",answer:"16"},
    {image:"ishihara plates\Ishihara-Plate-45.jpg",answer:"45"},
    {image:"ishihara plates\Ishihara-Plate-29.jpg",answer:"29"},
    {image:"ishihara plates\Ishihara-Plate-2.jpg",answer:"2"},
    {image:"ishihara plates\Ishihara-Plate-7.jpg",answer:"7"},
    {image:"ishihara plates\Ishihara-Plate-96.jpg",answer:"96"},
    {image:"ishihara plates\Ishihara-Plate-73.jpg",answer:"73"},
    {image:"ishihara plates\Ishihara-Plate-97.jpg",answer:"97"},
    {image:"ishihara plates\Ishihara-Plate-5-2.jpg",answer:"5"},
    {image:"ishihara plates\Ishihara-Plate-6-2.jpg",answer:"6"},
    {image:"ishihara plates\Ishihara-Plate-74.jpg",answer:"74"},
    {image:"ishihara plates\Ishihara-Plate-42.jpg",answer:"42"},
    {image:"ishihara plates\Ishihara-Plate-57.jpg",answer:"57"},
    {image:"ishihara plates\Ishihara-Plate-6.jpg",answer:"6"},
    {image:"ishihara plates\Ishihara-Plate-3.jpg",answer:"3"},
    {image:"ishihara plates\Ishihara-Plate-15.jpg",answer:"15"},
    {image:"ishihara plates\Ishihara-Plate-line1.jpg",answer:"nothing"},
    {image:"ishihara plates\Ishihara-Plate-26.jpg",answer:"26"},
    {image:"ishihara plates\Ishihara-Plate-line2.jpg",answer:"nothing"},
    {image:"ishihara plates\Ishihara-Plate-line-3.jpg",answer:"nothing"},
    {image:"ishihara plates\Ishihara-Plate-35.jpg",answer:"35"},
    {image:"ishihara plates\Ishihara-Plate-line4.jpg",answer:"nothing"},
]
//Javascript Initialization
const answer_element=document.querySelector("#image-number");
const imageEle = document.querySelector(".plate");
const submitBtn=document.querySelector(".button");
const quiz = document.querySelector(".quiz");
let currentQuiz=0;
let score=0;
let red_score=0;
let green_score=0;
let false_answer=0;

const insertBackslash = (str,n) =>{
  if(str.length>n){
    return str.slice(0, n) + '\\' + str.slice(n);
  }
    else{
      return str;
    }
  }
//Loading the Quiz Questions
const loadQuiz =()=>{
    const {image}=questions[currentQuiz];
    modifiedImage=insertBackslash(image,15);//insert backslash after 15 characters in the image url
    console.log(modifiedImage);
    imageEle.src=modifiedImage;
    let questionNumberElement = document.querySelector(".question_num");
    questionNumberElement.textContent = `Question No. ${currentQuiz + 1}/${questions.length}`;

}
const deselectAnswer=()=>{
    answer_element.value='';
}

document.addEventListener("keydown",(event)=>{
  if (event.code==="Enter"){
    event.preventDefault();
    submitBtn.click();
  } 
});

//Get the answer entered function once submit is clicked
submitBtn.addEventListener("click",() =>{
  let userAnswer = answer_element.value.trim();
  userAnswer = userAnswer.toLowerCase();
  if((currentQuiz===7 && userAnswer==="6") || (currentQuiz===13 && userAnswer==="2") || (currentQuiz===19 && userAnswer==="6") || (currentQuiz===22 && userAnswer==="5")){
    red_score++;
  }
  else if((currentQuiz===7 && userAnswer==="9") || (currentQuiz===13 && userAnswer==="4") || (currentQuiz===19 && userAnswer==="2") || (currentQuiz===22 && userAnswer==="3")){
    green_score++;
  }
  else if(userAnswer===questions[currentQuiz].answer){
    score++;
  }
  else{
    false_answer++;
  }
  currentQuiz++;
  if(currentQuiz<questions.length){
    deselectAnswer();
    loadQuiz();
  }else{
    let message='';
    if(score===questions.length || false_answer<=3){
      message='Congratulations!You have normal color vision.';
    }
    else if(false_answer>=4 && red_score===4){
      message='You have protanopia and hence you are unable to perceive red light.'
    }
    else if(false_answer>=4 && green_score===4){
      message='You have deuteranopia and hence you are unable to perceive green light.'
    }
    else if(score>=4 && false_answer<=18){
      message='You are partially red-green color blind.';
    }
    else if(false_answer>=19){
      message='You have red-green color blindness.';
    }
    quiz.innerHTML=`
    <div class='result'>
      <h2>Your Score:${score}/${questions.length} Correct Answers</h2>
      <p>${message}</p>
      <a href="test_home.html">
      <button class='reload-button'>Retake Quiz<span></span></button></a>
    </div>`;
  }
});

