"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express = require("express");
var cors = require("cors");
var db_config_1 = require("./config/db.config");
var port = process.env.PORT;
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db_config_1.connectDB();
app.use("/api/signup", require("./routes/signup"));
app.use("/api/auth", require("./routes/auth"));
app.listen(port, "0.0.0.0", function () {
    console.log("App running on port " + port);
});
module.exports = app;
