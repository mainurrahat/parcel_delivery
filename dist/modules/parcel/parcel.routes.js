"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parcel_controller_1 = require("./parcel.controller");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticateJWT);
router.post("/", (0, authMiddleware_1.authorizeRoles)("sender"), parcel_controller_1.createParcel);
router.get("/me", (0, authMiddleware_1.authorizeRoles)("sender"), parcel_controller_1.getMyParcels);
router.patch("/cancel/:id", (0, authMiddleware_1.authorizeRoles)("sender"), parcel_controller_1.cancelParcel);
exports.default = router;
