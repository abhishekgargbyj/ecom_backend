const express = require("express");
const router= express.Router();
const refreshTokenController = require("../controllers/refereshController");

router.get("/",refreshTokenController.handleRefreshToken);

module.exports =router;