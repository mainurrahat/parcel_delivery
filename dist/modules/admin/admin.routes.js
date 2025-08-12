"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRoles)("admin"));
router.get("/", admin_controller_1.getAllParcels);
router.patch("/status/:id", admin_controller_1.updateParcelStatus);
exports.default = router;
