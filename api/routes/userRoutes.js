const express = require("express");
const router = express.Router();
const handlerMaster = require("../handler/handlerMaster");
const multer = require("multer");

const upload = multer();
router.post("/", upload.single("file"), handlerMaster.user.postUserHandler);
router.get("/", handlerMaster.user.getAllUserHandler);
module.exports = router;
