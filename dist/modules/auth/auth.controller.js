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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_model_1 = require("../user/user.model");
const generateToken_1 = require("../utils/generateToken");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    const existingUser = yield user_model_1.User.findOne({ email });
    if (existingUser)
        return res.status(400).json({ message: "User already exists" });
    const user = yield user_model_1.User.create({ name, email, password, role });
    res.status(201).json({
        message: "Registered successfully",
        token: (0, generateToken_1.generateToken)(user._id.toString(), user.role),
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.User.findOne({ email });
    if (!user || user.isBlocked || !(yield user.comparePassword(password))) {
        return res
            .status(401)
            .json({ message: "Invalid credentials or user blocked" });
    }
    res.json({
        message: "Login successful",
        token: (0, generateToken_1.generateToken)(user._id.toString(), user.role),
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});
exports.login = login;
