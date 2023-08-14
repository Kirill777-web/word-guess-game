// 1. Variable Declarations
const startButton = document.querySelector('.start-button');
const timerElement = document.querySelector('.timer-count');
const wordBlankElement = document.querySelector('.word-blanks');
const secondsRem = document.querySelector('#sec-rem');
const winsCountElement = document.querySelector('.win');
const lossesCountElement = document.querySelector('.lose');
const resetButton = document.querySelector('.reset-button');

let gameStarted = false;
let wins = 0;
let losses = 0;
let timeLeft = 10;
let timerInterval;

// 2. Function Definitions

function startTimer() {
  //This checks if the game has NOT started yet using the ! (logical NOT) operator.
  if (!gameStarted) {
    //This line sets the gameStarted variable to true, indicating the game is now in progress.
    gameStarted = true;
    //These function calls will refresh the displayed wins and losses count, ensuring that they're up to date when the game starts.
    updateWinsCount();
    updateLossesCount();
    //This line disables the start button so that the user can't start the game again while it's already in progress.
    startButton.disabled = true;
    //This function call resets game-related elements to their default state, ensuring the game starts fresh.
    resetGameElements();

    //This sets up an interval that runs the provided function every 1000 milliseconds (or 1 second). It continues to run at this interval until it's cleared.
    timerInterval = setInterval(() => {
      //This checks if there's still time left. If so, the game continues.
      if (timeLeft > 0) {
        updateTimerDisplay();
        timeLeft--;
      } else {
        clearInterval(timerInterval);
        //This line checks if the word displayed isn't "JavaScript".
        if (wordBlankElement.textContent.replace(/\s/g, '') !== 'JavaScript') {
          //These lines update the UI to show "Word Not Guessed!", hide the "seconds remaining" message, increment the losses by 1, and then update the displayed losses count.
          wordBlankElement.textContent = 'Word Not Guessed!';
          secondsRem.style.display = 'none';
          losses++;
          updateLossesCount();
        } else {
          timerElement.textContent = 'Time is up'; // Or you can remove this if not needed
        }
        //after handling the end-game scenarios (word guessed or not), the game is reset to its initial state for another round.
        resetGame();
      }
    }, 1000);
  }
}
// Function to reset the wins and losses counts
function resetScores() {
  wins = 0; // Reset wins count to zero
  losses = 0; // Reset losses count to zero
  updateWinsCount(); // Update the wins display
  updateLossesCount(); // Update the losses display
}
// Function to reset the game after a certain delay (2 seconds)
function resetGame() {
  setTimeout(() => {
    // Introduce a delay before resetting
    startButton.disabled = false; // Enable the start button
    gameStarted = false; // Set game status to not started
    timeLeft = 10; // Reset the timer to 10 seconds
    resetGameElements(); // Reset the display elements of the game
  }, 2000); // 2 seconds delay
}
// Function to reset specific game elements to their default state
function resetGameElements() {
  updateTimerDisplay();
  wordBlankElement.textContent = 'J _ v _ S c r_ _t'; // Set the default word to be guessed
  secondsRem.style.display = 'block'; // Show the "seconds remaining" message after game started
}
// Function to update the timer display
function updateTimerDisplay() {
  let seconds = timeLeft;
  timerElement.textContent = `00:${seconds}`; // Display the remaining time in the format "00:seconds"
}
// Function to update the wins count display
function updateWinsCount() {
  winsCountElement.textContent = wins; // Display the current wins count
}
// Function to update the losses count display
function updateLossesCount() {
  lossesCountElement.textContent = losses;
}

// 3. Event Listeners
// Start the timer when the start button is clicked
startButton.addEventListener('click', startTimer);
// Reset the scores when the reset button is clicked

resetButton.addEventListener('click', resetScores);

// Keydown event listener to check if the user has pressed a letter
document.addEventListener('keydown', (event) => {
  // Check if the game has started and if a valid character key is pressed
  if (gameStarted && event.key.match(/^[a-z]$/)) {
    // Replace the blank "_" with the pressed key
    wordBlankElement.textContent = wordBlankElement.textContent.replace(
      '_',
      event.key
    );
    // Check if the word is fully guessed
    if (wordBlankElement.textContent.replace(/\s/g, '') === 'JavaScript') {
      clearInterval(timerInterval); // Stop the timer
      wordBlankElement.textContent = 'YOU WIN!'; // Display the "Word Guessed!" message
      secondsRem.style.display = 'none'; // Hide the "seconds remaining" message
      wins++; //Increment the wins count
      updateWinsCount(); // Update the wins display
      resetGame(); // Reset the game for the next round
    }
  }
});
