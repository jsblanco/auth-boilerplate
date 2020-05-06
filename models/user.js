"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var mongoose = require("mongoose");
var defaultConfig = {
    type: String,
    required: true,
    trim: true,
    unique: true
};
var userSchema = mongoose.Schema({
    username: __assign(__assign({}, defaultConfig), { unique: true }),
    email: __assign(__assign({}, defaultConfig), { unique: true }),
    password: defaultConfig,
}, {
    timestamps: true
});
module.exports = mongoose.model("User", userSchema);
