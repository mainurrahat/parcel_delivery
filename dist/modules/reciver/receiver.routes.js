"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const receiver_controller_1 = require("./receiver.controller");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRoles)("receiver"));
router.get("/incoming", receiver_controller_1.getIncomingParcels);
router.patch("/confirm/:id", receiver_controller_1.confirmDelivery);
exports.default = router;
