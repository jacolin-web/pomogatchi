import { 
  sessionTypes,
  DEFAULT_SESSIONS
} from './constants.js';

// Global variable to track the sessions array
let sessions = parseInt(localStorage.sessions) || DEFAULT_SESSIONS;
let sessionsArray = [];
let timer;
let currentTime;

// Function to build the schedule array
function buildSchedule() {
  //Add warm up session
  sessionsArray.push(sessionTypes[0]);

  // Loop through each session
  for (let i = 0; i < sessions; i++) {
    // Add the session time to the array
    sessionsArray.push(sessionTypes[1]);
    
    // Add a short break if it's not the last session
    if (i < sessions - 1) {
      sessionsArray.push(sessionTypes[2]);
    }
  }
  
  // Add the long break after all sessions
  sessionsArray.push(sessionTypes[3]);
}

// Build the schedule
buildSchedule();

//Global variables
let currentIndex = 0; // To keep track of the current time period in the array
let timeLeft = sessionsArray[currentIndex].time; // Start with the first session
let isRunning = false;

//SELECTORS
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const settingsButton = document.getElementById('settings');
const saveSettingsButton = document.getElementById('save-settings') || false;
const displayMessage = document.getElementById('message') || false;
const form = document.getElementById('settings-form');

updateDisplay(timeLeft); 

// Function to handle the timer based on the array
function startTimer() {
  startButton.hidden = true;
  pauseButton.hidden = false;

  if (!isRunning && currentIndex < sessionsArray.length) {
    isRunning = true;

    let currentSession = sessionsArray[currentIndex];
    currentTime = currentSession.time;
    timeLeft = currentTime;

    // Update the display with the session message
    displayMessage.innerHTML = currentSession.message;

    // Start the timer for the current session
    timer = setInterval(() => {
      if (currentTime > 0) {
        currentTime--;
        updateDisplay(currentTime);
      } else {
        // Move to the next session once the current one finishes
        currentIndex++;

        if (currentIndex < sessionsArray.length) {
          // Set time for the next session and update message
          let nextSession = sessionsArray[currentIndex];
          timeLeft = nextSession.time;
          currentTime = timeLeft;
          updateDisplay(timeLeft);
          displayMessage.innerHTML = nextSession.message; // Update the message
        } else {
          // All sessions are done; stop the timer
          clearInterval(timer);
          displayMessage.innerHTML = "All done! Great job!";
          isRunning = false;
          startButton.hidden = false;
          pauseButton.hidden = true;
        }
      }
    }, 1000);
  }
}

// Helper function to update the display
function updateDisplay(time) {
  if(timeDisplay){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

function pauseTimer() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timer);
  }
  pauseButton.hidden = true;
  startButton.hidden = false;
}

function resetTimer() {
  isRunning = false;
  clearInterval(timer);
  currentIndex = 0;
  // Reset to default session time in minutes
  updateDisplay(timeLeft);
}

function settingsPage() {
  window.location = 'settings.html';
}

if (timeDisplay) {
  startButton?.addEventListener('click', startTimer);
  pauseButton?.addEventListener('click', pauseTimer);
  resetButton?.addEventListener('click', resetTimer);
  settingsButton?.addEventListener('click', settingsPage);
}

form?.addEventListener('submit', function(event) {
  event.preventDefault();
    // Accessing values of the inputs
    const sessions = document.getElementById('sessions').value;
    const sessionTime = document.getElementById('sessions-time').value;
    const shortBreak = document.getElementById('short-break').value;
    const longBreak = document.getElementById('long-break').value;

    // You can then use these values to save to localStorage or pass them back to the timer page
    // Example: Save to localStorage (you can adjust this as needed)
    localStorage.setItem('sessions', sessions);
    localStorage.setItem('sessionTime', sessionTime);
    localStorage.setItem('shortBreak', shortBreak);
    localStorage.setItem('longBreak', longBreak);

    // Redirect to main page after saving
    window.location = 'index.html';
});
