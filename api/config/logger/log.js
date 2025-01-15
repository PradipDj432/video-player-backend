const winston = require("winston");
const CloudWatchTransport = require("winston-cloudwatch");
const awsMaster = require("./../aws/awsMaster");

// Enhanced error logging
const cloudWatchErrorHandler = (err) => {
  if (err) {
    console.error("CloudWatch Transport Error:", err);
  }
};

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new CloudWatchTransport({
      logGroupName: "video_player_log_group",
      logStreamName: "video_player_log_stream",
      awsAccessKeyId: awsMaster.awsConfig.access_key,
      awsSecretAccessKey: awsMaster.awsConfig.secret_access_key,
      region: awsMaster.awsConfig.region,
      messageFormatter: ({ level, message }) => {
        return `[${level}] ${message}`;
      },
      onError: cloudWatchErrorHandler,
    }),
    new CloudWatchTransport({
      logGroupName: "video_player_log_group",
      logStreamName: "video_player_error_log_stream",
      awsAccessKeyId: awsMaster.awsConfig.access_key,
      awsSecretAccessKey: awsMaster.awsConfig.secret_access_key,
      region: awsMaster.awsConfig.region,
      messageFormatter: ({ level, message }) => {
        return `[${level}] ${message}`;
      },
      onError: cloudWatchErrorHandler,
    }),
  ],
});

module.exports = logger;
