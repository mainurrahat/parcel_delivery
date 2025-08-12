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
exports.updateParcelStatus = exports.getAllParcels = void 0;
const parcel_model_1 = require("../parcel/parcel.model");
const getAllParcels = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parcels = yield parcel_model_1.Parcel.find();
    res.json(parcels);
});
exports.getAllParcels = getAllParcels;
const updateParcelStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findById(req.params.id);
    const { status, location, note } = req.body;
    if (!parcel)
        return res.status(404).json({ message: "Parcel not found" });
    parcel.currentStatus = status;
    parcel.statusLogs.push({
        status,
        location,
        note,
        updatedBy: req.user.id,
        timestamp: new Date(),
    });
    yield parcel.save();
    res.json({ message: "Parcel status updated", parcel });
});
exports.updateParcelStatus = updateParcelStatus;
