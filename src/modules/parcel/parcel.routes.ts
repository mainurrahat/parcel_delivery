import express from "express";
import { createParcel, cancelParcel, getMyParcels } from "./parcel.controller";
import {
  authenticateJWT,
  authorizeRoles,
} from "../../middlewares/authMiddleware";

const router = express.Router();

router.use(authenticateJWT);
router.post("/", authorizeRoles("sender"), createParcel);
router.get("/me", authorizeRoles("sender"), getMyParcels);
router.patch("/cancel/:id", authorizeRoles("sender"), cancelParcel);

export default router;
