"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var checkError = require("./../helpers/checkUser");
var signupController = require("./../controllers/signupController");
router.post("/", checkError(), signupController.signup);
module.exports = router;
