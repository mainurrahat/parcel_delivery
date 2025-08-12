import express from "express";
import { getAllParcels, updateParcelStatus } from "./admin.controller";
import {
  authenticateJWT,
  authorizeRoles,
} from "../../middlewares/authMiddleware";

const router = express.Router();

router.use(authenticateJWT, authorizeRoles("admin"));
router.get("/", getAllParcels);
router.patch("/status/:id", updateParcelStatus);

export default router;
