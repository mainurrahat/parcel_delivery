import { Request, Response, NextFunction } from "express";
import ApiError from "../modules/utils/ApiError";
import { STATUS_CODES } from "../constants/statusCodes";

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || STATUS_CODES.SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(err.details && { details: err.details }),
  });
};
