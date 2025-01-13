const winston = require("winston");
const path = require("path");

// Configure the winston logger
const logger = winston.createLogger({
  level: "info", // Set the default log level (can be adjusted to 'debug', 'warn', 'error', etc.)
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Add timestamp to logs
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Add colors to the log levels in the console
        winston.format.simple()
      ),
    }),

    // File transport (for general logs)
    new winston.transports.File({
      filename: path.join(__dirname, "logs/app.log"),
      level: "info", // You can set the level for different transports
    }),

    // File transport for error logs
    new winston.transports.File({
      filename: path.join(__dirname, "logs/error.log"),
      level: "error", // Only log error messages to this file
    }),
  ],
});

// Export logger to use throughout your application
module.exports = logger;
