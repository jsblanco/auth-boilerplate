"use strict";
var jwt = require("jsonwebtoken");
module.exports = function (userData) {
    var payload = {
        id: userData._id,
        username: userData.username,
        email: userData.email,
    };
    return { token: jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: 31536000,
        }) };
};
