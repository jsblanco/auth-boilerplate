export {};
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("./../controllers/authController");



const signupController = require('./../controllers/signupController');

router.post("/",
[
    check("username", "username is required").not().isEmpty(),
    check ("email", "email is not valid").isEmail(),
    check("password", "Password must be between 8 and 24 characters long").isLength({min: 8, max: 24})
],
signupController.signup
)

module.exports = router;