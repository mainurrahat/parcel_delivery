import { Request, Response } from "express";
import { Parcel } from "../parcel/parcel.model";

export const getIncomingParcels = async (req: Request, res: Response) => {
  const parcels = await Parcel.find({ receiver: req.user!.id });
  res.json(parcels);
};

export const confirmDelivery = async (req: Request, res: Response) => {
  const parcel = await Parcel.findById(req.params.id);
  if (!parcel) return res.status(404).json({ message: "Parcel not found" });

  if (parcel.receiver.toString() !== req.user!.id) {
    return res.status(403).json({ message: "Not your parcel" });
  }

  if (parcel.currentStatus !== "In Transit") {
    return res
      .status(400)
      .json({ message: "Cannot confirm unless in transit" });
  }

  parcel.currentStatus = "Delivered";
  parcel.statusLogs.push({
    status: "Delivered",
    location: parcel.deliveryAddress,
    updatedBy: req.user!.id,
    timestamp: new Date(),
  });

  await parcel.save();
  res.json({ message: "Parcel delivery confirmed", parcel });
};
