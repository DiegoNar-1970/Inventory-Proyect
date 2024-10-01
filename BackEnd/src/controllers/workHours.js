
import { auxTransportHrs } from '../const/const.js';
import { HRS_MONTH } from '../const/payForHour.js';
import { calcComissions } from '../helpers/calcComissions.js';
import { calcPaiment } from '../helpers/calcPaiment.js';
import { EmployeeModel } from "../models/employee/employee.js";
import { InfoPaimentModel } from '../models/infoPaiment/infoPaiment.js';
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


        if(messageW)return res.status(401).json({message:messageW})

         const baseSalary=(employee.baseSalary / HRS_MONTH );
         //podriamos evitar hacer la busqueda del empleado si desde el front enviamos la info del empleado 
         let {paiDayShift,paiNigthShift,paiDominicalShift,paiNigthDominicalShift,totalPaiment,hrs}=calcPaiment(workHour,baseSalary);

         let {dayTimeOvertime,nightOvertime,dayTimeHoliday,nightHoliday,paiForComissions,hrsC}=calcComissions(news,baseSalary) ;

          let totalHrs=hrs.hrs + hrsC.hrsC;
          let auxTransportPai= auxTransportHrs * totalHrs;
          if(auxTransportPai > 81000) auxTransportPai = 81000;

          totalPaiment+=auxTransportPai
          totalPaiment=parseFloat((totalPaiment + paiForComissions).toFixed(2));
          paiForComissions=parseFloat((paiForComissions).toFixed(2));
          
          let pension= parseFloat((totalPaiment * 0.04).toFixed(2)); 
          let salud= parseFloat((totalPaiment * 0.04).toFixed(2)); 

          let paiOutDeductions= (totalPaiment - pension) - salud;
          
          const paymentInfo = {
            employee: id,
            News: {
              news: news || [],
              newsStartWeek: newsStartWeek || 0,
              newsEndWeek: newsEndWeek || 0,
            }|| {},
            dayTimeHoliday: dayTimeHoliday || null,
            nightHoliday: nightHoliday || null,
            dayTimeOvertime: dayTimeOvertime || null,
            nightOvertime: nightOvertime || null,
            WorkHour: {
              workHours: workHour || [],
              startWeekworkHour: startWeekworkHour || 0,
              endWeekWorkHour: endWeekWorkHour || 0,
            },
            deducctions:{
              pension:pension,
              salud:salud
            },
            totalPaiment: totalPaiment || 0,
            paiDayShift: paiDayShift || null,
            paiNigthShift: paiNigthShift || null,
            paiDominicalShift: paiDominicalShift || null,
            paiNigthDominicalShift: paiNigthDominicalShift || null,
            paiForComissions: paiForComissions || 0,
            auxTransportHrs:auxTransportHrs,
            paiOutDeductions:paiOutDeductions,
            totalHrs: totalHrs,
            auxTransportPai:auxTransportPai,
          };
          
          const newInfoPaiment= await InfoPaimentModel.create(paymentInfo)
          
          return res.send({newInfoPaiment});
          
      }catch(err){
          return res.status(404).json({message:err.message})
        }
    }
}