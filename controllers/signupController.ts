const User = require("./../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { Request, Response } from "express";
const { validationResult } = require("express-validator");

exports.signup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "Email is already in the database" });
    }
    user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ msg: "username is already in the database" });
    }
    user = req.body;
    console.log(user)
    user.password = bcryptjs.hashSync(password, 10);
    const createdUser = await User.create(user);

    const payload = {
     username: createdUser.username,
     email: createdUser.email
    };

    console.log("payload", payload);

    jwt.sign(
      payload,
      process.env.SECRETKEY,
      {
        expiresIn: 31536000, // 1 Year
      },
      (error: any, token: any) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (e) {
    res.status(400).send("An error ocurred");
  }
};
