const questions=[
    {image:"tritan test images\tritan_1.png",correctCoords:[298,217,277,201,255,187,231,195,228,210,233,231,240,250,249,269,261,284,289,292,314,289,327,270,328,240,314,213]},
    {image:"tritan test images\tritan_2.png",correctCoords:[75,209,88,221,101,217,113,208,125,215,138,223,151,232,159,248,159,256,150,266,144,276,142,284,124,277,107,263,93,243,81,228]},
    {image:"tritan test images\tritan_3.png",correctCoords:[77,234,66,206,66,186,66,154,67,138,70,123,79,135,95,133,113,125,124,109,121,138,124,164,120,183,118,192,107,207,96,219]},
    {image:"tritan test images\tritan_4.png",correctCoords:[281,127,297,136,311,132,323,131,330,144,330,155,330,167,331,182,331,194,323,208,322,219,308,216,297,211,286,213,281,199,277,173,274,150]},
    {image:"tritan test images\tritan_5.png",correctCoords:[151,43,167,51,169,66,169,77,184,83,200,83,214,91,229,98,233,86,237,74,231,59,227,48,209,40,185,33,168,36]},
    {image:"tritan test images\tritan_6.png",correctCoords:[282,150,293,140,304,133,315,133,328,133,322,112,300,90,283,71,267,62,255,70,246,80,246,90,235,97,245,109,265,131]},
    {image:"tritan test images\tritan_7.png",correctCoords:[239,244,251,252,260,263,260,271,278,252,295,233,305,222,312,215,293,214,277,212,269,202,253,220]},
    {image:"tritan test images\tritan_8.png",correctCoords:[244,91,257,84,260,66,262,60,281,74,295,87,302,99,309,118,309,133,297,136,290,142,278,142,268,133,258,119,249,106]},
    {image:"tritan test images\tritan_9.png",correctCoords:[271,214,279,213,291,210,300,214,310,214,316,207,316,196,317,181,317,169,318,150,317,133,308,132,298,132,290,133,284,133,280,147,275,165,272,182,269,198]},
]
let currentQuestion=0;
let score=0;
let count=2;
let score_tracker=new Array(10).fill(0);

function displayResults(){
    let message='';
    if(score===0 || score===1){
        message='You have Tritanopia.'
    }
    else if(score===2 || score===3){
        message='You have severe tritanomaly.'
    }
    else if(score===4 || score===5){
        message='You have moderate tritanomaly.'
    }
    else if(score===6 || score===7){
        message='You have mild tritanomaly.'
    }
    else if(score===8 || score===9){
        message='Congratulations.You have normal color vision.'
    }
    var quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = `<div class='result'>
    <h2>Your Score:${score}/${questions.length} Correct Answers</h2>
    <p>${message}</p>
    <a href="blue_test.html">
    <button class='reload-button'>Retake Quiz<span></span></button></a>
  </div>`;
}

function insertBackslashandt(str,n){
    if(str.length>n){
        return str.slice(0, n) + '\\t' + str.slice(n);
      }
        else{
          return str;
        }
}
   
function loadQuestion(){
    var quizdiv=document.getElementById('quiz');
    const question=questions[currentQuestion];
    if(question.image[18]!='\\'){
    question.image=insertBackslashandt(question.image,18);
    }
    quizdiv.innerHTML=`<h3 class="question_num">Question No. ${currentQuestion + 1}/9</h3>
    <h4>Click On the Gap in the Ring!</h4>
    <img src="${question.image}" alt="image" class="plate" onclick="handleClick(event)">
`;
}
function isPointInsidePolygon(x, y, polyCoords) {
    var inside = false;
    for (var i = 0, j = polyCoords.length - 2; i < polyCoords.length - 1; j = i, i += 2) {
        var xi = polyCoords[i], yi = polyCoords[i + 1];
        var xj = polyCoords[j], yj = polyCoords[j + 1];
        var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}
function handleClick(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    var question = questions[currentQuestion];
    var isInside = isPointInsidePolygon(x, y, question.correctCoords);
    if (isInside) {
    if(score_tracker[currentQuestion]==0){
    score_tracker[currentQuestion]=1;
    score++;
    }
    if(currentQuestion<questions.length-1){
        currentQuestion++;
        loadQuestion();
    }
    else{
        displayResults();
    }
    } else {

        count--;
        if(count===0){

            if(currentQuestion>0 || (currentQuestion==0 && score_tracker[currentQuestion]==1)){
            score--;
            }
            displayResults();
        }
        else{
            if(currentQuestion>0){
            currentQuestion--;
            loadQuestion();
            }
        }
    }
}
loadQuestion();