"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var User = require("../models/user");
var bcryptjs = require("bcryptjs");
var validationResult = require("express-validator").validationResult;
var signToken = require("./../helpers/signToken");
exports.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, password, email, userInDb, checkPassword, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                password = req.body.password;
                email = req.body.email.toLowerCase();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.findOne({ email: email })];
            case 2:
                userInDb = _a.sent();
                console.log(userInDb);
                if (!userInDb)
                    return [2 /*return*/, res.status(400).json({ msg: "Email or password not valid" })];
                checkPassword = bcryptjs.compareSync(password, userInDb.password);
                if (!checkPassword)
                    return [2 /*return*/, res.status(400).json({ msg: "Email or password not valid" })];
                res.json(signToken(userInDb));
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.log(e_1);
                res.status(400).send("An error ocurred");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.me = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, user, payload, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.findOne({ email: req.body.token.email }).select("-password")];
            case 2:
                user = _a.sent();
                payload = {
                    token: { id: user._id, username: user.username, email: user.email },
                };
                res.json(signToken(payload));
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                console.error(e_2);
                res.status(500).json({ msg: "Server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, oldPassword, email, password, id, checkEmail, userData, checkPassword, salt, hashPassword, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, oldPassword = _a.oldPassword, email = _a.email, password = _a.password;
                id = req.body.token.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 9, , 10]);
                if (!(email !== req.body.token.email)) return [3 /*break*/, 3];
                return [4 /*yield*/, User.findOne({ email: email })];
            case 2:
                checkEmail = _b.sent();
                if (checkEmail)
                    return [2 /*return*/, res.status(400).json({ msg: "Email not valid" })];
                _b.label = 3;
            case 3: return [4 /*yield*/, User.findById(id)];
            case 4:
                userData = _b.sent();
                return [4 /*yield*/, bcryptjs.compare(oldPassword, userData.password)];
            case 5:
                checkPassword = _b.sent();
                if (!checkPassword)
                    return [2 /*return*/, res.status(400).json({ msg: "Password incorrect" })];
                return [4 /*yield*/, bcryptjs.genSalt(10)];
            case 6:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs.hash(password, salt)];
            case 7:
                hashPassword = _b.sent();
                return [4 /*yield*/, User.findByIdAndUpdate(id, {
                        username: username,
                        email: email,
                        password: hashPassword,
                    })];
            case 8:
                _b.sent();
                res.json(signToken({ _id: id, username: username, email: email }));
                return [3 /*break*/, 10];
            case 9:
                e_3 = _b.sent();
                console.error(e_3);
                res.status(500).json({ msg: "Server error" });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.delete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userData, checkPassword, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.token.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, User.findById(id)];
            case 2:
                userData = _a.sent();
                if (!req.body.password)
                    return [2 /*return*/, res.status(400).json({ msg: "Password empty" })];
                return [4 /*yield*/, bcryptjs.compare(req.body.password, userData.password)];
            case 3:
                checkPassword = _a.sent();
                if (!checkPassword)
                    return [2 /*return*/, res.status(400).json({ msg: "Password incorrect" })];
                return [4 /*yield*/, User.findByIdAndRemove(id)];
            case 4:
                _a.sent();
                res.json({ msg: "User deleted" });
                return [3 /*break*/, 6];
            case 5:
                e_4 = _a.sent();
                console.error(e_4);
                res.status(500).json({ msg: "Server error" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
