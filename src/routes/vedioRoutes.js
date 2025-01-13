const express = require("express");
const router = express.Router();
const handlerMaster = require("../handler/handlerMaster");

router.post("/redeem", handlerMaster.video.postVideoHandler);

module.exports = router;
