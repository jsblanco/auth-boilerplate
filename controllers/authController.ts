const User = require("../models/user");
const bcryptjs = require("bcryptjs");
import { Request, Response } from "express";
const { validationResult }= require("express-validator");
const signToken = require("./../helpers/signToken");

exports.login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password }= req.body
    const email = req.body.email.toLowerCase()

    try {
        let userInDb = await User.findOne({email})
        if (!userInDb) return res.status(400).json({msg: "Email or password not valid"})
        const checkPassword = bcryptjs.compareSync(password, userInDb.password);
        if (!checkPassword) return res.status(400).json({msg: "Email or password not valid"})
        res.json(signToken(userInDb))
    }
 catch (e) {
   console.log(e)
    res.status(400).send("An error ocurred");
  }
}