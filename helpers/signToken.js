"use strict";
var jwt = require("jsonwebtoken");
module.exports = function (userData) {
    var payload = {
        user: {
            _id: userData._id,
            username: userData.username,
            email: userData.email,
        },
    };
    console.log(userData, payload);
    return { token: jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: 31536000,
        }) };
};
