import mongoose from "mongoose";
import { calcTime } from '../../helpers/calcTime.js';
import { queryCond } from '../../helpers/queryConditios.js';
import Employee from '../employee/employee.js';
import { vWorkHourSchemaZod } from '../workHours/workHourZod.js';

const {Schema}=mongoose
const workHourSchema = new Schema({
    employee: { 
      type: Schema.Types.ObjectId, ref: 'Employee'
    },
    week: { type: Number },
    dayHour: {
      hours:{type:Number, default:0},
      minutes:{type:Number, default:0},
     },
    creationDate: { type: Date },
    isHoliday: { type: Boolean, default:false },
    leaveWork: {type : Date},
    checkTime:{type:Date},
    lunch:{type:Boolean,default:false},
    breakfast:{type:Boolean,default:false},

  });
  
  const WorkHour = mongoose.model('WorkHour', workHourSchema);
  export default WorkHour;

  export class WorkHourModel{

    static async create(id,data){

      const result = vWorkHourSchemaZod({...data,employee:id});

      if (!result.success) {
        return { message: 'invalid type', error: result.error };
      }
      try {

        const employee = await Employee.findById(id);

          if(!employee){
            return { message: 'El empleado no existe' };
          }

          const {checkTime,leaveWork,hours,minutes,creationDate}=calcTime(
            result.data.checkTime,
            result.data.leaveWork,
            result.data.breakfast,
            result.data.lunch,
            result.data.creationDate
          )


        const {checkTime: _,leaveWork: __, ...rest}=result.data;

        const newWorkH = new WorkHour({
          checkTime:checkTime,
          leaveWork:leaveWork,
          dayHour:{
            hours:hours,
            minutes:minutes, 
          },
          creationDate:creationDate,
          ...rest,
        });
       
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
          if(worHour===undefined){
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
          select:'-__v -admissionDate',
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

    static async calcHours(area,data){
      try{
          const query=queryCond(data);
          const hours=await this.getHours(area,query)
          if(hours.message){
            return{message:hours.message}
          }
          console.log('calc',hours);
          return hours;
      }catch(err){
        return {message:err}
      }
    }

    static async getHours(area,query){
      try{ 
        const hours =await WorkHour.find(query,{__v:0}).populate({
          path:'employee',
          select:'area profile',
          match:{area:area},
          populate:{
              path:'profile',
              select:'cc lastName name '
          }
      }).exec();
      
      const filterHours=hours.filter(hour=>{
        return hour.employee?.area===area
      })
       console.log('filter',filterHours);
      return filterHours;
      }catch(err){
        return {message:err.message}
      }
    }
    }