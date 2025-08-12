"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmDelivery = exports.getIncomingParcels = void 0;
const parcel_model_1 = require("../parcel/parcel.model");
const getIncomingParcels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parcels = yield parcel_model_1.Parcel.find({ receiver: req.user.id });
    res.json(parcels);
});
exports.getIncomingParcels = getIncomingParcels;
const confirmDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findById(req.params.id);
    if (!parcel)
        return res.status(404).json({ message: "Parcel not found" });
    if (parcel.receiver.toString() !== req.user.id) {
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
        updatedBy: req.user.id,
        timestamp: new Date(),
    });
    yield parcel.save();
    res.json({ message: "Parcel delivery confirmed", parcel });
});
exports.confirmDelivery = confirmDelivery;
