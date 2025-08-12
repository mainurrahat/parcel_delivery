import mongoose, { Schema, Document } from "mongoose";

interface IStatusLog {
  status: string;
  location: string;
  note?: string;
  updatedBy: string;
  timestamp: Date;
}

export interface IParcel extends Document {
  type: string;
  weight: number;
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  pickupAddress: string;
  deliveryAddress: string;
  deliveryDate: Date;
  fee: number;
  trackingId: string;
  currentStatus: string;
  statusLogs: IStatusLog[];
  isBlocked: boolean;
}

const statusLogSchema = new Schema<IStatusLog>({
  status: { type: String, required: true },
  location: String,
  note: String,
  updatedBy: String,
  timestamp: { type: Date, default: Date.now },
});

const parcelSchema = new Schema<IParcel>(
  {
    type: { type: String, required: true },
    weight: { type: Number, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
    fee: { type: Number, required: true },
    trackingId: { type: String, required: true, unique: true },
    currentStatus: { type: String, default: "Requested" },
    statusLogs: [statusLogSchema],
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Parcel = mongoose.model<IParcel>("Parcel", parcelSchema);
