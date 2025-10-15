const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFile = path.join(logsDir, 'app.log');

// Simple logging utility
const logger = {
  info: (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] INFO: ${message}\n`;
    console.log(logMessage.trim());
    fs.appendFileSync(logFile, logMessage);
  },
  
  error: (message, error = null) => {
    const timestamp = new Date().toISOString();
    const errorMessage = error ? `${message}: ${error.message || error}` : message;
    const logMessage = `[${timestamp}] ERROR: ${errorMessage}\n`;
    console.error(logMessage.trim());
    fs.appendFileSync(logFile, logMessage);
  },
  
  warn: (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] WARN: ${message}\n`;
    console.warn(logMessage.trim());
    fs.appendFileSync(logFile, logMessage);
  }
};

module.exports = logger;
