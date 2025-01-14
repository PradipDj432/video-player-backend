const logger = require("./logger/log");
const connectMongoDB = require("./mongoDB/connectMongoDB");
const awsMaster = require("./aws/awsMaster");
const configMaster = {};

configMaster.logger = logger;
configMaster.connectMongoDB = connectMongoDB;
configMaster.awsMaster = awsMaster;

module.exports = configMaster;
