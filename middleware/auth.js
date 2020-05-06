"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    var token = req.header("x-auth.token");
    if (!token) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    try {
        var signature = jwt.verify(token, process.env.SECRETKEY);
        req.email = signature.email;
        next();
    }
    catch (e) {
        res.status(401).json({ msg: "Invalid token" });
    }
};
