import { Request, Response, NextFunction } from "express";
import { Parcel } from "./parcel.model";
import { STATUS_CODES } from "../../constants/statusCodes";
import ApiError from "../utils/ApiError";
import { nanoid } from "nanoid";

// Create a parcel
export const createParcel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(new ApiError(STATUS_CODES.UNAUTHORIZED, "Unauthorized"));
    }

    const {
      type,
      weight,
      receiver, // receiver user id as string expected
      pickupAddress,
      deliveryAddress,
      deliveryDate,
      fee,
    } = req.body;

    if (
      !type ||
      !weight ||
      !receiver ||
      !pickupAddress ||
      !deliveryAddress ||
      !deliveryDate ||
      !fee
    ) {
      return next(
        new ApiError(
          STATUS_CODES.BAD_REQUEST,
          "All required fields must be provided"
        )
      );
    }

    const trackingId = nanoid(10); // Generate unique tracking id

    const parcel = await Parcel.create({
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

    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "Parcel created successfully",
      data: parcel,
    });
  } catch (error) {
    console.error("Create Parcel Error:", error);
    next(
      new ApiError(STATUS_CODES.SERVER_ERROR, "Failed to create parcel", error)
    );
  }
};

// Cancel a parcel
export const cancelParcel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(new ApiError(STATUS_CODES.UNAUTHORIZED, "Unauthorized"));
    }

    const parcel = await Parcel.findById(req.params.id);
    if (!parcel) {
      return next(new ApiError(STATUS_CODES.NOT_FOUND, "Parcel not found"));
    }

    // Check if the logged-in user is the sender
    if (parcel.sender.toString() !== req.user.id) {
      return next(
        new ApiError(
          STATUS_CODES.FORBIDDEN,
          "You are not allowed to cancel this parcel"
        )
      );
    }

    if (parcel.currentStatus !== "Requested") {
      return next(
        new ApiError(
          STATUS_CODES.BAD_REQUEST,
          "Parcel cannot be cancelled after dispatch"
        )
      );
    }

    parcel.currentStatus = "Cancelled";
    parcel.statusLogs.push({
      status: "Cancelled",
      location: parcel.pickupAddress,
      updatedBy: req.user.id,
      timestamp: new Date(),
    });

    await parcel.save();

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Parcel cancelled successfully",
      data: parcel,
    });
  } catch (error) {
    console.error("Cancel Parcel Error:", error);
    next(
      new ApiError(STATUS_CODES.SERVER_ERROR, "Failed to cancel parcel", error)
    );
  }
};

// Get parcels sent by logged-in user
export const getMyParcels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(new ApiError(STATUS_CODES.UNAUTHORIZED, "Unauthorized"));
    }

    const parcels = await Parcel.find({ sender: req.user.id });

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Parcels retrieved successfully",
      data: parcels,
    });
  } catch (error) {
    console.error("Get My Parcels Error:", error);
    next(
      new ApiError(STATUS_CODES.SERVER_ERROR, "Failed to fetch parcels", error)
    );
  }
};
