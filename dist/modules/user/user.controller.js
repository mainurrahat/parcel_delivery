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
exports.unblockUser = exports.blockUser = exports.getAllUsers = void 0;
const user_model_1 = require("./user.model");
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find().select("-password");
    res.json(users);
});
exports.getAllUsers = getAllUsers;
const blockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndUpdate(req.params.id, { isBlocked: true }, { new: true });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json({ message: "User blocked" });
});
exports.blockUser = blockUser;
const unblockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndUpdate(req.params.id, { isBlocked: false }, { new: true });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json({ message: "User unblocked" });
});
exports.unblockUser = unblockUser;
