import mongoose from "mongoose";
import {vWorkHourSchemaZod} from '../workHours/workHourZod.js'
import Employee from "../employee/employee.js";
const {Schema}=mongoose

const workHourSchema = new Schema({
    employee: { 
      type: Schema.Types.ObjectId, ref: 'Employee'
    },
    week: { type: Number },
    dayHour: { type: Number},
    date: { type: Date, default:Date.now() },
    holiday: {
      type: [{
          isHoliday: { type: Boolean },
          hrsHoliday: { type: Number }
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
    static async getAll(id=0){
      if(id!=0){
        try{
          const worHour = await WorkHour.findById(id,{__v:0});
          if(worHour==undefined){
            return {message:'not found'}
          }
          return worHour;
        }catch(err){
          return {message:err.message};
        }
      }
      try{
        const worHours=await WorkHour.find({},{__v:0})
        .populate({
          path:'employee',
          select:'-__v -shift -admissionDate',
          populate:{
              path:'profile',
              select:'-__v -birthdate -sex'
          }
      });
        return worHours;
      }catch(err){
        return {message:err.message};
      }
    }
    }