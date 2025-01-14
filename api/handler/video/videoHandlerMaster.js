const postVideoHandler = require("./postVideoHandler");
const getAllVideoHandler = require("./getAllVideoHandler");
// const getVideoHandler = require("./getVideoHandler");
const videoHandlerMaster = {};

videoHandlerMaster.postVideoHandler = postVideoHandler;
videoHandlerMaster.getAllVideoHandler = getAllVideoHandler;
// videoHandlerMaster.getVideoHandler = getVideoHandler;

module.exports = videoHandlerMaster;
