var currentQuestion = 0;       //first variable // index of the current question
var score = 0;               //score will start from 0
var count = 1;
var totQuestion = questions.length;            //questions--defined in question.js file //to keep the total questions count


var container = document.getElementById("quizContainer");  //access all html
var questionEl = document.getElementById("question");        //access the question to display
var opt1 = document.getElementById("opt1");                    //access to all the options
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var opt4 = document.getElementById("opt4");
var nextButton = document.getElementById("nextButton");      // access to the next button
var resultCont = document.getElementById("result");             // access to the result 
var homeButton = document.getElementById("home");
var txt;

var interval;

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
		if(timer == 0,10){
			alert("Your time is up");
			stopTimer();
			container.style.display = "none";
			resultCont.style.display = '';
		    resultCont.textContent = "Your Score: " + score;
			homeButton.style.display= '';
			colorChange();
		}
		
        }
    }, 1000);
}


function stopTimer(){
	clearInterval(interval);
}

window.onload = function () {
    var twoMinutes = 120 * 1;
    display = document.querySelector('.timer');
    startTimer(twoMinutes, display);
};



function loadQuestion (questionIndex) {         
	var q = questions[questionIndex];
	questionEl.textContent = (questionIndex + 1) + '. ' + q.question;
	opt1.textContent = q.option1;
	opt2.textContent = q.option2;
	opt3.textContent = q.option3;
	opt4.textContent = q.option4;
	
};   //method loadQuestion- to load the question
     // q - to get the questions from the array index, index=0 is first question will be return
     //assign the question element,questionEL    //to display the question number questionIndex+1

function negativeMarks(){
	if(score>0){
	score = score - 1;
	}//values does not matach -1 will be given
}

function colorChange(){
	if(score == 0){
		document.getElementById("background").style.backgroundColor = "rgb(255, 0, 0,0.5)";
	}
	if(score < 10 && score != 0){
		document.getElementById("background").style.backgroundColor = "rgb(255, 255, 102,0.5)";
	}
	if(score >= 10){
		document.getElementById("background").style.backgroundColor = "rgb(102, 255, 102,0.5)";
	}
	if(score == 20){
		document.getElementById("background").style.backgroundColor = "rgb(0, 77, 0,0.8)";
	}
	
}

function loadNextQuestion () {
	var selectedOption = document.querySelector("input[type=radio]:checked");
	if(!selectedOption){
		alert("Please select your answer!")
		return;
	}   //selectedOption = to check whether the option is selected or not 
	    //if not selected if block will execute 
	var answer = selectedOption.value;
	if(questions[currentQuestion].answer == answer){
		score += 2;
	}   //if the option is selected it will the the value<defined in html>
	     //and it will compare with the questions array<currentQuestion will get the index>
		 //if the vales mataches 2 points will be given 
	else if(questions[currentQuestion].answer != answer){
	negativeMarks();
	} 
	selectedOption.checked = false;
	currentQuestion++;
	if(currentQuestion == totQuestion - 1){
		nextButton.textContent = "Finish"
	}   //if currentQuestion == 10-1 == 9 this will work
	    //in the last question button will change into finish
	if(currentQuestion == totQuestion){
		container.style.display = "none";
		resultCont.style.display = '';
		resultCont.textContent = "Your Score: " + score;
		homeButton.style.display= '';
		
		
		//STOP TIMER
		stopTimer();
		alert("You have answered all the 10 questions!");
		colorChange();
		return;
	} 
	// when you completeed the last question
	    // hide the container which shows everything ,<div class="container"></div>
		//and display the container result div
	loadQuestion(currentQuestion);  //will load the next question after if block executed
} //to load the next question which is defineded in the html onclick

loadQuestion(currentQuestion); //first question should call manually




