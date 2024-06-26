import mongoose from "mongoose";
import {vWorkHourSchemaZod} from '../workHours/workHourZod.js'
import Employee from "../employee/employee.js";
const {Schema}=mongoose

const workHourSchema = new Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
    week: { type: Number },
    dayHour: { type: Number},
    date: { type: Date, default:Date.now() },
    holiday: {
      type: [{
          isHoliday: { type: Boolean },
          holidayNumber: { type: Number }
      }]}
  });
  
  const WorkHour = mongoose.model('WorkHour', workHourSchema);
  export default WorkHour;

  export class WorkHourModel{
    static async create(id,data){
      const result = vWorkHourSchemaZod(data);
      if (!result.success) {
        return { message: 'invalid type', error: result.error };
      }
      try {
        const newWorkH = new WorkHour(result.data);
        const employee = await Employee.findById(id);
        newWorkH.employee = employee;
        await newWorkH.save();
        return newWorkH;
      } catch (err) {
        return { message: err.message };
      }
    }

    }