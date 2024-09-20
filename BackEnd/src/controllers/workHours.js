
import { PAY_FOR_HOUR } from '../const/payForHour.js';
import { TYPE_SHIFT } from '../const/TYPES_HOURS.js';
import { calcComissions } from '../helpers/calcComissions.js';
import { EmployeeModel } from "../models/employee/employee.js";
import { NewsModel } from "../models/news/news.js";
import { WorkHourModel } from "../models/workHours/workHour.js";

export class WorkHourController{
  static async create(req,res){
    const { id } = req.params;
    const { creationDate } = req.body
    const CreationDate = new Date(creationDate);
    let result = req.body;
    result={...result,creationDate:CreationDate}
    
if (!result || !id) {
    return res.status(400).json({ message: 'insufficient params' });
}

try {
  const {newWorkH,message,error} = await WorkHourModel.create(id, result);
  if (message) {
    return res.status(400).json({ message: message , err:error });
  }
  return res.status(201).json(newWorkH);
} catch (err) {
  return res.status(400).json({ message: err.message });
}
}
    static async getAll(req,res){
        const {id}=req.query;
        if(id){
          try{
            const worHour= await WorkHourModel.getAll(id);
            if(worHour.message){
              return res.status(400).json(worHour.message);
            }
            return res.status(201).json(worHour);
          }catch(err){
            return res.status(404).json({message:err.message});
          }
        }
        const worHours= await WorkHourModel.getAll();
        return res.send(worHours);
    }
    
    static async calcHours(req,res){
      const {area}=req.query
      if(!area){
        return res.status(401).json({message:'need area'})
      }   
      try{
        const allHours=await WorkHourModel.calcHours(area,req.body);
        if(allHours.message){
         return res.status(401).json({message:allHours.message})
        }
       return res.send(allHours);
      }catch(err){
        return res.status(404).json({message:err})
      }
    }
    
    static async groupByType(req,res){
      const {endWeek}=req.body;
      const {startWeek}=req.body;    
      const {newsDateE,newsDateS,newsStartW,newsEndW}=req.body;
      const data={newsDateE,newsDateS,newsStartW,newsEndW};
      const {id}=req.params;

      try{
        const employee= await EmployeeModel.getByid(id);

        if(!employee){
          return res.status(400).json({message:'Empleado no encontrado'});
        }

        const news=await NewsModel.groupByType(id,data,newsStartW,newsEndW);
        const workHour=await WorkHourModel.groupByType(id,req.body,startWeek,endWeek);
      if(workHour.message){
          return res.status(401).json({message:workHour.message})
          }
          
      if(news.message){
          return res.status(401).json({message:news.message})
         }

         let paiDayShift={pai:0,hrs:0,type:''};
         let paiForHour=0;
         console.log(workHour);
         Object.entries(workHour.hours).forEach(([key,value])=>{
          if(value._id===TYPE_SHIFT.DAY_SHIFT){
              paiDayShift.pai=value.calcHoursTotal * PAY_FOR_HOUR
              paiDayShift.hrs=value.calcHoursTotal;
              paiDayShift.type=value._id;
              paiForHour=paiDayShift.pai;
          }
         })
         console.log('paiDayShift',paiDayShift) 
         const {dayTimeOvertime,nightOvertime,dayTimeHoliday,nightHoliday,paiForComissions}=calcComissions(news);
         console.log(news)
         console.log(dayTimeHoliday,nightHoliday,dayTimeOvertime,nightOvertime,paiForComissions);
        return res.send(workHour);

      }catch(err){
          return res.status(404).json({message:err.message})
        }
    }
}