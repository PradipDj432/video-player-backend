const logger = require("./logger/log");
const connectMongoDB = require("./mongodb/connectMongoDB");
const configMaster = {};

configMaster.logger = logger;
configMaster.connectMongoDB = connectMongoDB;

module.exports = configMaster;
