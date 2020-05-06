require("dotenv").config();
const express = require("express");
const cors = require("cors");
import {connectDB} from './config/db.config';
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/signup", require("./routes/signup"));
app.use("/login", require("./routes/auth"));

app.listen(port, "0.0.0.0", ()=>{
    console.log(`App running on port ${port}`)
})



module.exports = app;