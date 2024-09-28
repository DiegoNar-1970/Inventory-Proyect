import mongoose from "mongoose";

const {Schema, model} = mongoose;

const extraHourSchema = new Schema({
    extraHours: { type: String },
    comissions: { type: String }
}, { _id: false }); 

const newsItemSchema = new Schema({
    _id: {type: extraHourSchema},
    commissionHours: {type: Number},
    calcHoursTotal: {type: Number}
}, { _id: false });

export const newsInfoSchema = new Schema({
    news: {type: [newsItemSchema], default: [] }
});
export const NewsInfo = model('NewsInfo', newsInfoSchema);

export const hourDetailSchema = new Schema({
    totalHours: { type: Number},
    typeHour: { type: String  },
    comissions: { type: String  },
    paiExtraForHour: { type: Number  },
    paiOfHours: { type: Number },
    paiForHourComission: { type: Number }
}, { _id: false }); 

export const WorkHoursItem = new Schema({
    _id: {type:String},
    comissionForNigthShift: { type: Number  },
    calcHoursTotal: { type: Number  }
},{_id: false});

export const infoWorkHoursSchema = new Schema({
    workHours:[{type:WorkHoursItem}],
});

