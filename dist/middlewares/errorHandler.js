"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const statusCodes_1 = require("../constants/statusCodes");
const errorHandler = (err, _req, res, _next) => {
    const statusCode = err.statusCode || statusCodes_1.STATUS_CODES.SERVER_ERROR;
    res.status(statusCode).json(Object.assign({ success: false, message: err.message || "Internal Server Error" }, (err.details && { details: err.details })));
};
exports.errorHandler = errorHandler;
