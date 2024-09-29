import mongoose from "mongoose";

const { Schema, model } = mongoose;

const extraHourSchema = new Schema({
    extraHours: { type: String, default: null },
    comissions: { type: String, default: null }
}, { _id: false });

export const newsItemSchema = new Schema({
    _id: { type: extraHourSchema },
    commissionHours: { type: Number, default: null },
    calcHoursTotal: { type: Number, default: null }
}, { _id: false });

export const hourDetailSchema = new Schema({
    totalHours: { type: Number, default: null },
    typeHour: { type: String, default: null },
    comissions: { type: String, default: null },
    paiExtraForHour: { type: Number, default: null },
    paiOfHours: { type: Number, default: null },
    paiForHourComission: { type: Number, default: null }
}, { _id: false });

export const WorkHoursItem = new Schema({
    _id: { type: String, default: null },
    comissionForNigthShift: { type: Number, default: null },
    calcHoursTotal: { type: Number, default: null }
}, { _id: false });

export const paiForHoursShiftSchema = new Schema({
    pai: { type: Number, default: null },
    hrs: { type: Number, default: null },
    type: { type: String, default: null },
}, { _id: false });