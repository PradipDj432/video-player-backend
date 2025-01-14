const logger = require("./logger/log");
const connectMongoDB = require("./mongodb/connectMongoDB");
const awsMaster = require("./aws/awsMaster");
const configMaster = {};

configMaster.logger = logger;
configMaster.connectMongoDB = connectMongoDB;
configMaster.awsMaster = awsMaster;

module.exports = configMaster;
