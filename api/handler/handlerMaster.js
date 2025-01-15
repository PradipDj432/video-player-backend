const videoHandlerMaster = require("./video/videoHandlerMaster");
const userHandlerMaster = require("./user/userHandlerMaster");
const handlerMaster = {};

handlerMaster.video = videoHandlerMaster;
handlerMaster.user = userHandlerMaster;

module.exports = handlerMaster;
