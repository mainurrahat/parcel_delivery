import express from "express";
import { getAllUsers, blockUser, unblockUser } from "./user.controller";
import {
  authenticateJWT,
  authorizeRoles,
} from "../../middlewares/authMiddleware";

const router = express.Router();

router.use(authenticateJWT, authorizeRoles("admin"));
router.get("/", getAllUsers);
router.patch("/block/:id", blockUser);
router.patch("/unblock/:id", unblockUser);

export default router;
