const awsConfig = require("./awsConfig");
const connectS3 = require("./connectS3");
const awsMaster = {};
awsMaster.awsConfig = awsConfig;
awsMaster.connectS3 = connectS3;
module.exports = awsMaster;
