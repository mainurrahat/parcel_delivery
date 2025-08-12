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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyParcels = exports.cancelParcel = exports.createParcel = void 0;
const parcel_model_1 = require("./parcel.model");
const statusCodes_1 = require("../../constants/statusCodes");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const nanoid_1 = require("nanoid");
// Create a parcel
const createParcel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return next(new ApiError_1.default(statusCodes_1.STATUS_CODES.UNAUTHORIZED, "Unauthorized"));
        }
        const { type, weight, receiver, // receiver user id as string expected
        pickupAddress, deliveryAddress, deliveryDate, fee, } = req.body;
        if (!type ||
            !weight ||
            !receiver ||
            !pickupAddress ||
            !deliveryAddress ||
            !deliveryDate ||
            !fee) {
            return next(new ApiError_1.default(statusCodes_1.STATUS_CODES.BAD_REQUEST, "All required fields must be provided"));
        }
        const trackingId = (0, nanoid_1.nanoid)(10); // Generate unique tracking id
        const parcel = yield parcel_model_1.Parcel.create({
            type,
            weight,
            sender: req.user.id, // ObjectId of sender
            receiver, // ObjectId of receiver
            pickupAddress,
            deliveryAddress,
            deliveryDate,
            fee,
            trackingId,
            currentStatus: "Requested",
            statusLogs: [
                {
                    status: "Requested",
                    location: pickupAddress,
                    updatedBy: req.user.id,
                    timestamp: new Date(),
                },
            ],
        });
        res.status(statusCodes_1.STATUS_CODES.CREATED).json({
            success: true,
            message: "Parcel created successfully",
            data: parcel,
        });
    }
    catch (error) {
        console.error("Create Parcel Error:", error);
        next(new ApiError_1.default(statusCodes_1.STATUS_CODES.SERVER_ERROR, "Failed to create parcel", error));
    }
});
exports.createParcel = createParcel;
// Cancel a parcel
const cancelParcel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return next(new ApiError_1.default(statusCodes_1.STATUS_CODES.UNAUTHORIZED, "Unauthorized"));
        }
        const parcel = yield parcel_model_1.Parcel.findById(req.params.id);
        if (!parcel) {
            return next(new ApiError_1.default(statusCodes_1.STATUS_CODES.NOT_FOUND, "Parcel not found"));
        }
        // Check if the logged-in user is the sender
        if (parcel.sender.toString() !== req.user.id) {
            return next(new ApiError_1.default(statusCodes_1.STATUS_CODES.FORBIDDEN, "You are not allowed to cancel this parcel"));
        }
        if (parcel.currentStatus !== "Requested") {
            return next(new ApiError_1.default(statusCodes_1.STATUS_CODES.BAD_REQUEST, "Parcel cannot be cancelled after dispatch"));
        }
        parcel.currentStatus = "Cancelled";
        parcel.statusLogs.push({
            status: "Cancelled",
            location: parcel.pickupAddress,
            updatedBy: req.user.id,
            timestamp: new Date(),
        });
        yield parcel.save();
        res.status(statusCodes_1.STATUS_CODES.SUCCESS).json({
            success: true,
            message: "Parcel cancelled successfully",
            data: parcel,
        });
    }
    catch (error) {
        console.error("Cancel Parcel Error:", error);
        next(new ApiError_1.default(statusCodes_1.STATUS_CODES.SERVER_ERROR, "Failed to cancel parcel", error));
    }
});
exports.cancelParcel = cancelParcel;
// Get parcels sent by logged-in user
const getMyParcels = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return next(new ApiError_1.default(statusCodes_1.STATUS_CODES.UNAUTHORIZED, "Unauthorized"));
        }
        const parcels = yield parcel_model_1.Parcel.find({ sender: req.user.id });
        res.status(statusCodes_1.STATUS_CODES.SUCCESS).json({
            success: true,
            message: "Parcels retrieved successfully",
            data: parcels,
        });
    }
    catch (error) {
        console.error("Get My Parcels Error:", error);
        next(new ApiError_1.default(statusCodes_1.STATUS_CODES.SERVER_ERROR, "Failed to fetch parcels", error));
    }
});
exports.getMyParcels = getMyParcels;
