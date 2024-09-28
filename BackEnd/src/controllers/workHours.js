
import { HRS_MONTH } from '../const/payForHour.js';
import { calcComissions } from '../helpers/calcComissions.js';
import { calcPaiment } from '../helpers/calcPaiment.js';
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
    return res.status(400).json({ message: message , err : error ?? null});
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
        if(employee.message){
          return res.status(400).json({message:'Empleado no encontrado',err:employee.message});
        }
        const {news,newsEndWeek,newsStartWeek,messageN}=await NewsModel.groupByType(id,data,newsStartW,newsEndW);
        
        if(messageN)return res.status(401).json({message:messageN})

        const {workHour,endWeekWorkHour,startWeekworkHour,messageW}=await WorkHourModel.groupByType(id,req.body,startWeek,endWeek);

        if(messageW)return res.status(401).json({message:message})

         const baseSalary=(employee.baseSalary / HRS_MONTH );
         //podriamos evitar hacer la busqueda del empleado si desde el front enviamos la info del empleado 
         const {paiDayShift,paiNigthShift,paiDominicalShift,paiNigthDominicalShift,totalPaiment}=calcPaiment(workHour,baseSalary);

         const {dayTimeOvertime,nightOvertime,dayTimeHoliday,nightHoliday,paiForComissions}=calcComissions(news,baseSalary) ;

        return res.send({employee,news,dayTimeHoliday,nightHoliday,dayTimeOvertime,nightOvertime,workHour,paiForComissions,totalPaiment});

      }catch(err){
          return res.status(404).json({message:err.message})
        }
    }
}