"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signToken = require("./signToken");
require("dotenv").config();
var appName = "App-";
appName += process.env.APPNAME;
module.exports = function (res, payloadInfo) {
    console.log('userData', payloadInfo);
    res.cookie(appName, signToken(payloadInfo), {
        maxAge: 43200000,
        httpOnly: true,
        secure: false
    }).send("Cookie sent");
};
