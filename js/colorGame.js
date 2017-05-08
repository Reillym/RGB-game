// Coded by Michael Reilly
// Future addition: If player wins on a difficulty 3 times in a row then increase the difficulty

// GLOBAL VARS
var numSquares = 3;
var attempts = 1;
var attemptCount = 0;
var colors = [];
var pickedColor;
// SELECTORS
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var displayMessage = document.querySelector("#displayMessage");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

// Initialize Game
init();

function init() {
  // Set up Event Listeners on mode buttons
  setUpModeButtons();
  setUpSquares();
  reset();
}

function setUpModeButtons() {
  for(var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      modeButtons[2].classList.remove("selected");
      this.classList.add("selected");
      if (this.textContent === "Easy") {
        numSquares = 3;
        attempts = 1;
      }
      else if (this.textContent === "Hard") {
        numSquares = 6;
        attempts = 2;
      }
      else {
        numSquares = 9;
        attempts = 3;
      }
      reset();
    });
  }
}

function setUpSquares() {
  for(var i = 0; i < squares.length; i++) {
    // Adds click listeners to squares
    squares[i].addEventListener("click", function() {
      // Store color of clicked square
      var clickedColor = this.style.background;
      // Compares clicked color to picked color
      if (attemptCount === attempts) {
        displayMessage.textContent = "You ran out of tries!";
        resetButton.textContent = "Play Again!";
        changeColors(clickedColor);
        h1.style.background = clickedColor;
      }
      else if (clickedColor === pickedColor) {
        displayMessage.textContent = "Correct!";
        resetButton.textContent = "Play Again!";
        changeColors(clickedColor);
        h1.style.background = clickedColor;
      } else {
        attemptCount++;
        this.style.background = "#232323";
        displayMessage.textContent = "Tries left: " + (attempts - attemptCount);
        if (attemptCount === attempts) {
          displayMessage.textContent = "You ran out of tries!";
          resetButton.textContent = "Play Again!";
          changeColors(clickedColor);
          h1.style.background = clickedColor;
        }
      }
    });
  }
}

function reset() {
  // Generate new colors
  colors = generateRandomColors(numSquares);
  // Pick new random color from array
  pickedColor = pickColor();
  // Reset guess counter to 1
  attemptCount = 0;
  // Change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  // Set h1 background back to steelblue
  h1.style.background = "#232323";
  // Reset button content to say "New Colors"
  resetButton.textContent = "New Colors";
  // Reset the message display to blank
  displayMessage.textContent = "Tries left: " + (attempts - attemptCount);
  // Change colors of squares
  for(var i = 0; i < squares.length; i++) {
    if(colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
}

resetButton.addEventListener("click", function() {
  reset();
});

function changeColors(color) {
  for(var i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  var colors = [];
  for (var i = 0; i < num; i++) {
    colors.push(randomColor());
  }
  return colors;
}

function randomColor() {
  // Pick a red from 0 - 255
  var r = Math.floor(Math.random() * 256);
  // Pick a green from 0 - 255
  var g = Math.floor(Math.random() * 256);
  // Pick a blue from 0 - 255
  var b = Math.floor(Math.random() * 256);
  // Return a color in rgb format
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
