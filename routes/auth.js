"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var check = require("express-validator").check;
var authController = require("./../controllers/authController");
var auth = require("./../middleware/auth");
router.post("/", authController.login);
/*
router.get("/",
    auth,
    authController.authMe
);*/
module.exports = router;
