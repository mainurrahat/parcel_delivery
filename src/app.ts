import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Parcel Delivery API is running");
});
app.use("/api/auth", require("./modules/auth/auth.routes").default);
export default app;
