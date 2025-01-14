const express = require("express");
const router = express.Router();
const handlerMaster = require("../handler/handlerMaster");
const multer = require("multer");

const upload = multer();
router.post("/", upload.single("file"), handlerMaster.video.postVideoHandler);
router.get("/", handlerMaster.video.getAllVideoHandler);
module.exports = router;
