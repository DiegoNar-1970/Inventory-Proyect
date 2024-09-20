import mongoose from "mongoose";
import { calcTime } from "../../helpers/calcTime.js";
import { queryCond } from '../../helpers/queryConditios.js';
import Employee from '../employee/employee.js';
import { NewsModel } from "../news/news.js";
import { vWorkHourSchemaZod } from './workHourZod.js';

const {Schema}=mongoose
const workHourSchema = new Schema({
    employee: { type: Schema.Types.ObjectId, ref: 'Employee' },
    dayHour: {
      hours:{type:Number, default:0},
      minutes:{type:Number, default:0},
    },
    week: { type: Number },
    creationDate: { type: Date, default:Date.now() },
    leaveWork: {type : Date},
    checkTime:{type:Date},
    breakfast:{type:Boolean,default:false},
    lunch:{type:Boolean,default:false},
    typeHour:{ type: String},
    news:{type: Schema.Types.ObjectId, ref:'News'},

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
          const {checkTime,leaveWork,hours,minutes,horasExtras,recargos}=calcTime(
            result.data.checkTime,
            result.data.leaveWork,
            result.data.breakfast,
            result.data.lunch,
            result.data.typeHour,
          )

        const {checkTime : _, leaveWork : __, ...rest}=result.data;
        const {breakfast : b, lunch : l, typeHour:t, ...dataNews}=rest;

        const news=await NewsModel.create({
          ...dataNews,
          extraHours:{...horasExtras},
          comissions:{...recargos},
        });
        const newsId = (news.comissions.type === 'NO_APLICA' && news.extraHours.type === 'NO_APLICA')
          ? null
          : news._id;
        const newWorkH = new WorkHour({
          checkTime:checkTime,
          leaveWork:leaveWork,
          dayHour:{
            hours:hours,
            minutes:minutes, 
          }, 
          news:newsId,
          ...rest
        });
        await newWorkH.save();
        return {newWorkH};
      } catch (err) {
        return { message: err };
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
          const groupedByEmployee = hours.reduce((acc, curr) => {
            const employeeId = curr.employee.profile.cc.toString(); 
            
            if (!acc[employeeId]) {
              acc[employeeId] = {
                totalHours: 0,
                totalMinutes: 0, 
                info: []
              };
            }
          
            acc[employeeId].totalHours += curr.dayHour.hours;
            acc[employeeId].totalMinutes += curr.dayHour.minutes;
            acc[employeeId].info.push(curr);

            if(curr.news!=null){
              acc[employeeId].totalHours += curr.news.extraHours.hours;
              acc[employeeId].totalMinutes += curr.news.extraHours.minutes;
            }
            
            if (acc[employeeId].totalMinutes >= 60) {
              let additionalHours = Math.floor(acc[employeeId].totalMinutes / 60);
              acc[employeeId].totalHours += additionalHours;
              acc[employeeId].totalMinutes = acc[employeeId].totalMinutes % 60;
            }
          
            return acc;
          }, {});

          
          return groupedByEmployee;
      }catch(err){
        return {message:err}
      }
    }

    static async getHours(area,query){
      try{ 
        const hours =await WorkHour.find(query,
          {
          __v:0
        }).populate({
          path:'employee',
          select:'area profile',
          match:{area:area},
          populate:{
              path:'profile',
              select:'cc lastName name '
          }
        }).populate({
          path: 'news',
          select: '-__v -employee  -_id'
        }).exec();
      const filterHours=hours.filter(hour=>{
        return hour.employee?.area===area
      })
      return filterHours;
      }catch(err){
        return {message:err}
      }
    }

    static async groupByType(id,data,endWeek,startWeek){

        const query=queryCond(data);
        const employeeId = new mongoose.Types.ObjectId(id);
        let hours=await WorkHour.aggregate([
          {
            $match: {
              ...query,
              employee: employeeId 
            }
          },
          {
            $group:{
            _id: "$typeHour", 
            totalMinutes: { $sum: "$dayHour.minutes"},
            totalHoras: { $sum:"$dayHour.hours" }
          }
        },
        {
            $project: {
            _id: 1,
            calcHoursTotal: {
                $sum: [
                  "$totalHoras", 
                  { $divide: ["$totalMinutes", 60] }]
              }
          }
        }
      ]);
      
      if(hours.length === 0){
        return {message:'No se Encontraron Datos Por favor ingresa fechas con registros'}
      };
        hours={
          ...hours,
          endWeek:endWeek,
          startWeek:startWeek,
        };

        return{hours}
      }
      
    }
