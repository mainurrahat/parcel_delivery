import { StatusCode } from "../../constants/statusCodes";

export default class ApiError extends Error {
  public statusCode: StatusCode;
  public details?: any;

  constructor(statusCode: StatusCode, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
