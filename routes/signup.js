"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var check = require("express-validator").check;
var authController = require("./../controllers/authController");
var signupController = require('./../controllers/signupController');
router.post("/", [
    check("username", "username is required").not().isEmpty(),
    check("email", "email is not valid").isEmail(),
    check("password", "Password must be between 8 and 24 characters long").isLength({ min: 8, max: 24 })
], signupController.signup);
module.exports = router;
