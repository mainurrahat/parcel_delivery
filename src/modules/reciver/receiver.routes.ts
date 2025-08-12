import express from "express";
import { getIncomingParcels, confirmDelivery } from "./receiver.controller";
import {
  authenticateJWT,
  authorizeRoles,
} from "../../middlewares/authMiddleware";

const router = express.Router();

router.use(authenticateJWT, authorizeRoles("receiver"));
router.get("/incoming", getIncomingParcels);
router.patch("/confirm/:id", confirmDelivery);

export default router;
