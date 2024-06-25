import mongoose from "mongoose";

const {Schema}=mongoose

const workHourSchema = new Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    week: { type: Number, required: true },
    dayHour: { type: date},
    date: { type: date, default:Date.now },
    holiday:[{type:Boolean},{type:number}]
  });
  
  const WorkHour = mongoose.model('WorkHour', workHourSchema);
  export default WorkHour;