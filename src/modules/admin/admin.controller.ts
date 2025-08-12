import { Request, Response } from "express";
import { Parcel } from "../parcel/parcel.model";

export const getAllParcels = async (_req: Request, res: Response) => {
  const parcels = await Parcel.find();
  res.json(parcels);
};

export const updateParcelStatus = async (req: Request, res: Response) => {
  const parcel = await Parcel.findById(req.params.id);
  const { status, location, note } = req.body;

  if (!parcel) return res.status(404).json({ message: "Parcel not found" });

  parcel.currentStatus = status;
  parcel.statusLogs.push({
    status,
    location,
    note,
    updatedBy: req.user!.id,
    timestamp: new Date(),
  });

  await parcel.save();
  res.json({ message: "Parcel status updated", parcel });
};