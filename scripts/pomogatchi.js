//DEFAULT VALUES
const DEFAULT_SESSIONS = 3;
const DEFAULT_SESSION_TIME = 1;
const DEFAULT_SHORT_BREAK = 5;
const DEFAULT_LONG_BREAK = 15;
const DEFAULT_SEC_PER_MIN = 60;

// Retrieve and convert the session values from localStorage, with proper fallback
let sessions = parseInt(localStorage.sessions) || DEFAULT_SESSIONS;
let sessionTime = parseInt(localStorage.sessionTime) || DEFAULT_SESSION_TIME;
let shortBreak = parseInt(localStorage.shortBreak) || DEFAULT_SHORT_BREAK;
let longBreak = parseInt(localStorage.longBreak) || DEFAULT_LONG_BREAK;

// Create a default dictionary for each session type
const sessionTypes = [
  {
    type: "Session", // Represents a work session
    time: sessionTime * DEFAULT_SEC_PER_MIN,
    message: "Let's get to it!!"
  },
  {
    type: "Short Break", // Represents a short break
    time: shortBreak * DEFAULT_SEC_PER_MIN,
    message: "Take a short break!"
  },
  {
    type: "Long Break", // Represents a long break
    time: longBreak * DEFAULT_SEC_PER_MIN,
    message: "Take a long break!"
  }
];

// Global variable to track the sessions array
let sessionsArray = [];

// Function to build the schedule array
function buildSchedule() {
  // Loop through each session
  for (let i = 0; i < sessions; i++) {
    // Add the session time to the array
    sessionsArray.push(sessionTypes[0]);
    
    // Add a short break if it's not the last session
    if (i < sessions - 1) {
      sessionsArray.push(sessionTypes[1]);
    }
  }
  
  // Add the long break after all sessions
  sessionsArray.push(sessionTypes[2]);
  
  // Output the array for debugging
  console.log(sessionsArray);
}

// Build the schedule
buildSchedule();

//Global variables
let currentIndex = 0; // To keep track of the current time period in the array
let timeLeft = sessionsArray[currentIndex].time; // Start with the first session

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
  if (currentIndex < sessionsArray.length) {
    // Update the timer for the current time period
    let currentSession = sessionsArray[currentIndex];
    let currentTime = currentSession.time;
  
    // Update the display with the session message
    displayMessage.innerHTML = currentSession.message;
    
   // Start the timer for the current session
   setInterval(() => {
      if (currentTime > 0) {
        currentTime--;
        updateDisplay(currentTime);
      } else {
        // Move to the next session once the current one finishes
        currentIndex++;
        if (currentIndex < scheduleArray.length) {
          // Set time for the next session and update message
          timeLeft = scheduleArray[currentIndex].time;
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
}

function resetTimer() {
  isRunning = false;
  clearInterval(timer);
  timeLeft = sessionTime * DEFAULT_SEC_PER_MIN;
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
    sessions = document.getElementById('sessions').value;
    sessionTime = document.getElementById('sessions-time').value;
    shortBreak = document.getElementById('short-break').value;
    longBreak = document.getElementById('long-break').value;

    // You can then use these values to save to localStorage or pass them back to the timer page
    // Example: Save to localStorage (you can adjust this as needed)
    localStorage.setItem('sessions', sessions);
    localStorage.setItem('sessionTime', sessionTime);
    localStorage.setItem('shortBreak', shortBreak);
    localStorage.setItem('longBreak', longBreak);

    // Redirect to main page after saving
    window.location = 'index.html';
});
