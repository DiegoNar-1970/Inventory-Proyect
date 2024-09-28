const mongoose = require('mongoose');


const extraHourSchema = new mongoose.Schema({
    extraHours: { type: String },
    comissions: { type: String }
}, { _id: false }); 

const newsItemSchema = new mongoose.Schema({
    _id: {type: extraHourSchema},
    commissionHours: {type: Number},
    calcHoursTotal: {type: Number}
}, { _id: false });

const newsInfoSchema = new mongoose.Schema({
    news: {type: [newsItemSchema], default: [] },
    startWeek: { type: Number, default:null},
    endWeek: { type: Number, default:null }
});

export const NewsInfo = mongoose.model('NewsInfo', newsInfoSchema);

