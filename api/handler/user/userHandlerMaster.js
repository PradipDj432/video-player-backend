const postUserHandler = require("./postUserHandler");
const getAllUserHandler = require("./getAllUserHandler");
const userHandlerMaster = {};

userHandlerMaster.postUserHandler = postUserHandler;
userHandlerMaster.getAllUserHandler = getAllUserHandler;
module.exports = userHandlerMaster;
