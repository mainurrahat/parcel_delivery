"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTrackingId = void 0;
const generateTrackingId = () => {
    const date = new Date();
    const iso = date.toISOString();
    const yyyyMMdd = iso.split("T")[0].replace(/-/g, "");
    const random = Math.floor(100000 + Math.random() * 900000);
    return `TRK-${yyyyMMdd}-${random}`;
};
exports.generateTrackingId = generateTrackingId;
