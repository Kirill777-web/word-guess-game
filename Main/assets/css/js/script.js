// UI Elements
const startButton = document.querySelector('.start-button'); // Button to start the game
const timerElement = document.querySelector('.timer-count'); // Display for the timer
const wordBlankElement = document.querySelector('.word-blanks'); // Where the word or blanks are displayed
const wordHintElement = document.querySelector('.word-hint span'); // Display for the word hint
const secondsRem = document.querySelector('#sec-rem'); // Message displaying "Seconds remaining..."
const winsCountElement = document.querySelector('.win'); // Display for the win count
const lossesCountElement = document.querySelector('.lose'); // Display for the loss count
const resetButton = document.querySelector('.reset-button'); // Button to reset scores

// Game states and initial values
let gameStarted = false; // Flag to check if game has started
let wins = 0; // Track number of wins
let losses = 0; // Track number of losses
let timeLeft = 10; // Time left for the game
let timerInterval; // Reference to the timer

// Predefined words and their hints
const wordsAndHints = [
  { word: 'JavaScript', hint: 'A popular scripting language' },
  { word: 'Programming', hint: 'The process of creating software' },
  { word: 'WebDevelopment', hint: 'Building websites' },
  { word: 'Frontend', hint: 'Deals with the visual part of a website' },
  { word: 'Backend', hint: 'Deals with the server side of a website' },
];

// Function to reset the game elements
function resetGameElements() {
  const randomIndex = Math.floor(Math.random() * wordsAndHints.length); // Get a random index for word selection
  currentWord = wordsAndHints[randomIndex].word; // Set the current word to guess
  currentWordHint = wordsAndHints[randomIndex].hint; // Set the current word hint

  // Update UI elements
  updateTimerDisplay(); // Refresh the timer display
  wordBlankElement.textContent = currentWord.replace(/./g, '_ '); // Set the blanks for the word
  wordHintElement.textContent = currentWordHint; // Display the hint for the word
  secondsRem.style.display = 'block'; // Show the remaining time message
}

// Function to start the game timer and game logic
function startTimer() {
  // Start the game if it hasn't started yet
  if (!gameStarted) {
    gameStarted = true;
    updateWinsCount(); // Refresh wins count
    updateLossesCount(); // Refresh losses count
    startButton.disabled = true; // Disable the start button to prevent re-clicks during an ongoing game
    resetGameElements(); // Reset the game elements for a fresh start

    // Timer logic
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        updateTimerDisplay(); // Update the timer display
        timeLeft--; // Decrement the timer
      } else {
        // Actions to take when timer runs out
        clearInterval(timerInterval);
        if (wordBlankElement.textContent.replace(/\s/g, '') !== currentWord) {
          wordBlankElement.textContent = 'Word Not Guessed!'; // Indicate that word wasn't guessed
          secondsRem.style.display = 'none';
          losses++;
          updateLossesCount(); // Update losses count
        } else {
          timerElement.textContent = 'Time is up';
        }
        resetGame(); // Reset the game after timer runs out
      }
    }, 1000); // Timer updates every second
  }
}

// Function to reset the wins and losses counters
function resetScores() {
  wins = 0;
  losses = 0;
  updateWinsCount(); // Refresh the wins display
  updateLossesCount(); // Refresh the losses display
}

// Function to reset the game state
function resetGame() {
  setTimeout(() => {
    startButton.disabled = false; // Re-enable the start button
    gameStarted = false; // Mark the game as not started
    timeLeft = 10; // Reset the timer
    resetGameElements(); // Reset the game UI elements
  }, 2000); // Delay the reset for 2 seconds for a better user experience
}

// Function to update the timer display
function updateTimerDisplay() {
  let seconds = timeLeft < 10 ? '0' + timeLeft : timeLeft; // Ensure double-digit display
  timerElement.textContent = `00:${seconds}`; // Update the timer display
}

// Function to display current wins count
function updateWinsCount() {
  winsCountElement.textContent = wins;
}

// Function to display current losses count
function updateLossesCount() {
  lossesCountElement.textContent = losses;
}

// Event listener for the start button
startButton.addEventListener('click', startTimer);

// Event listener for the reset scores button
resetButton.addEventListener('click', resetScores);

// Event listener for user's key presses
document.addEventListener('keydown', (event) => {
  // Game logic when user presses a key
  if (gameStarted && event.key.match(/^[a-z]$/i)) {
    const regex = new RegExp('_'); // Regular expression to find the next blank
    wordBlankElement.textContent = wordBlankElement.textContent.replace(
      regex,
      event.key
    ); // Replace blank with the pressed key

    // Check if user has guessed the word correctly
    if (wordBlankElement.textContent.replace(/\s/g, '') === currentWord) {
      clearInterval(timerInterval); // Stop the timer
      wordBlankElement.textContent = 'YOU WIN!'; // Indicate a win
      secondsRem.style.display = 'none'; // Hide the "Seconds remaining" message
      wins++;
      updateWinsCount(); // Update wins count
      resetGame(); // Reset the game
    }
  }
});
