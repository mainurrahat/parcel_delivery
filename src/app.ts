import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import parcelRoutes from "./modules/parcel/parcel.routes";
import receiverRoutes from "./modules/reciver/receiver.routes";
import adminRoutes from "./modules/admin/admin.routes";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Parcel Delivery API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/parcels", parcelRoutes);
app.use("/api/receiver", receiverRoutes);
app.use("/api/admin/parcels", adminRoutes);

export default app;
