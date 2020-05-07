const jwt  = require("jsonwebtoken");
import { Request, Response, NextFunction } from 'express';
type tokenReq = Request & {email: string}

module.exports = (req : tokenReq, res : Response, next: NextFunction) => {
    let appName="App-"
    appName+= process.env.APPNAME


    const token = req.header("x-auth-token");
    if (!req.cookies[appName].token) {
        return res.status(401).json({msg: "Unauthorized"})
    }
    try {
        const signature = jwt.verify(token, process.env.SECRETKEY);
        req.body.token = signature.token;
        next()
    } catch (e) {
        res.status(401).json({msg: "Invalid token"})
    }
}