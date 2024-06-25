import mongoose from "mongoose";

const {Schema,model}=mongoose

const vacationsSchema = new Schema({
    employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    vacationsPai: { type: Number, required: true },
    startDate: { type: Date, default:Date.now},
    endDate: { type: Date, required: true },
  });

const Vacation = model('Vacation',vacationsSchema);
export default Vacation;