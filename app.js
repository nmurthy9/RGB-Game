var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

//
var squareNav = ["#sq1", "#sq2", "#sq3", "#sq4", "#sq5", "#sq6"];
var clicked = [];
//

init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

function setupSquares(){
	for(var i = 0; i < squares.length; i++){
	//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.background;
			//compare color to pickedColor
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?"
				changeColors(clickedColor);
				h1.style.background = clickedColor;
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again"
			}
		});
	}
}



function reset(){
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors"
	messageDisplay.textContent = "";
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block"
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
	//
	squareNav = ["#sq1", "#sq2", "#sq3", "#sq4", "#sq5", "#sq6"];
	clicked = [];
	$(".square").removeClass("current");
	//
}

resetButton.addEventListener("click", function(){
	reset();
})

function changeColors(color){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.background = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = []
	//repeat num times
	for(var i = 0; i < num; i++){
		//get random color and push into arr
		arr.push(randomColor())
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from  0 -255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from  0 -255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

////////////////////////////////////////////////////////////////////////////////

function select(name) {
	$(".square").removeClass("current");
	$(".square").removeClass("highlight");
	$(name).addClass("current");
	$(name).addClass("highlight");
	//$(name).style.color = "#FFFFFF";
}

function getCurrent() {
	selected = $(".current"); // this returns an array
	if (selected.length != 0) {
		return "#" + selected.first().attr('id');
	}
	return null;
}

function next() {
	selected = getCurrent();
	if (selected != null) {
		index = squareNav.indexOf(selected);
		index = (index + 1) % squareNav.length;
	} else { index = 0; }
	select(squareNav[index]);
}

function notClicked(name) {
	for (var i=0; i<clicked.length; i++) {
		if (name === clicked[i]) {
			return false;
		}
	}
	return true;
}

function clickCurrent() {
	currentButton = getCurrent();
	if (currentButton != null && notClicked("#" + currentButton)) {
		$(currentButton).click();
		id = "#"+$(currentButton).first().attr('id');
		indexToRemove = squareNav.indexOf(id);
		squareNav.splice(indexToRemove, 1);
		clicked.push("#" + currentButton);
		$(currentButton).removeClass("highlight");
	}
}

$(document).keypress(function(event) {
	if (event.key == "a") {
		next();
	} else if (event.key == "d") {
		clickCurrent();
	} else if (event.key == "r") {
		reset();
	}
})
