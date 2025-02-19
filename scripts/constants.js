//DEFAULT VALUES
export const DEFAULT_SESSIONS = 3;
export const DEFAULT_SESSION_TIME = 1;
export const DEFAULT_SHORT_BREAK = 5;
export const DEFAULT_LONG_BREAK = 5;
export const DEFAULT_SEC_PER_MIN = 60;

// Retrieve and convert the session values from localStorage, with proper fallback
let sessions = parseInt(localStorage.sessions) || DEFAULT_SESSIONS;
let sessionTime = parseInt(localStorage.sessionTime) || DEFAULT_SESSION_TIME;
let shortBreak = parseInt(localStorage.shortBreak) || DEFAULT_SHORT_BREAK;
let longBreak = parseInt(localStorage.longBreak) || DEFAULT_LONG_BREAK;

// DEFAULT DICTIONARY
export const sessionTypes = [
    {
      type: "warmup", // Represents a work session
      time: longBreak * DEFAULT_SEC_PER_MIN,
      message: "Plan out your sessions"
    },
    {
      type: "session", // Represents a work session
      time: sessionTime * DEFAULT_SEC_PER_MIN,
      message: "Let's get to it!!"
    },
    {
      type: "break", // Represents a short break
      time: shortBreak * DEFAULT_SEC_PER_MIN,
      message: "Take a short break!"
    },
    {
      type: "cooldown", // Represents a long break
      time: longBreak * DEFAULT_SEC_PER_MIN,
      message: "Celebrate your work!"
    }
  ];

