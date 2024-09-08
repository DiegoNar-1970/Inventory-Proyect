
import { EH_DAYTIME_HOLIDAY, EH_DAYTIME_OVERTIME, EH_NIGHT_HOLIDAY, EH_NIGHT_OVERTIME } from '../const/payForHour.js';
import { EX_HOUR } from '../const/TYPES_HOURS.js';
import { EmployeeModel } from "../models/employee/employee.js";
import { NewsModel } from "../models/news/news.js";
import { WorkHourModel } from "../models/workHours/workHour.js";

export class WorkHourController{
  static async create(req,res){
    const { id } = req.params;
    const result = req.body;
if (!result || !id) {
    return res.status(400).json({ message: 'insufficient params' });
}

try {
  const {newWorkH} = await WorkHourModel.create(id, result);
  if (newWorkH.message) {
    return res.status(400).json({ message: newWorkH.message });
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
         return res.status(401).json({err:allHours.message})
        }
       return res.send(allHours);
      }catch(err){
        return res.status(404).json({err:err.message})
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

        let dayTimeOvertime={ totalHours:0, paiForHour:0, comissions :[] }
        let nightOvertime={ totalHours:0, paiForHour:0, comissions : [] }
        let dayTimeHoliday={ totalHours:0, paiForHour:0, comissions : [] }
        let nightHoliday={ totalHours:0, paiForHour:0, comissions : [] }
        
        Object.entries(news.news).forEach(([key,value])=>{ 

          if(value._id?.extraHours === EX_HOUR.DAYTIME_OVERTIME){
            dayTimeOvertime.totalHours += value.calcHoursTotal;
            dayTimeOvertime.paiForHour += dayTimeOvertime.totalHours * EH_DAYTIME_OVERTIME
            if(value._id.comissions != "NO_APLICA" ) dayTimeOvertime.comissions.push(value._id.comissions)
          }
          if(value._id?.extraHours === EX_HOUR.NIGHT_OVERTIME){
            nightOvertime.totalHours += value.calcHoursTotal;
            nightOvertime.paiForHour += nightOvertime.totalHours * EH_NIGHT_OVERTIME
            if(value._id.comissions != "NO_APLICA" ) nightOvertime.comissions.push(value._id.comissions)
          }
          if(value._id?.extraHours === EX_HOUR.DAYTIME_HOLIDAY){
            dayTimeHoliday.totalHours += value.calcHoursTotal;
            dayTimeHoliday.paiForHour += dayTimeHoliday.totalHours * EH_DAYTIME_HOLIDAY
            if(value._id.comissions != "NO_APLICA" ) dayTimeHoliday.comissions.push(value._id.comissions)
          }
          if(value._id?.extraHours === EX_HOUR.NIGHT_HOLIDAY){
            nightHoliday.totalHours += value.calcHoursTotal;
            nightHoliday.paiForHour += nightHoliday.totalHours * EH_NIGHT_HOLIDAY
            if(value._id.comissions != "NO_APLICA" ) dayTimeHoliday.comissions.push(value._id.comissions)
          }

        })
        console.log(dayTimeOvertime)
        console.log(nightOvertime)
        console.log(dayTimeHoliday)
        console.log(nightHoliday)
        return res.send({news});

      }catch(err){
          return res.status(404).json({message:err.message})
        }
    }
}