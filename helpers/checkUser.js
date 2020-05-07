"use strict";
var check = require("express-validator").check;
module.exports = function () {
    return [
        check("username", "username is required").not().isEmpty(),
        check("email", "Email not valid").isEmail(),
        check("password", "Password too short (min 8)").isLength({
            min: 8,
            max: 24,
        }),
    ];
};
