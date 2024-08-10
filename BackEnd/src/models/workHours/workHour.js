import mongoose from "mongoose";
import { queryCond } from '../../helpers/queryConditios.js';
import Employee from "../employee/employee.js";
import { vWorkHourSchemaZod } from '../workHours/workHourZod.js';
const {Schema}=mongoose

const workHourSchema = new Schema({
    employee: { 
      type: Schema.Types.ObjectId, ref: 'Employee'
    },
    week: { type: Number },
    dayHour: { type: Number},
    date: { type: Date, default:Date.now() },
    holiday:{
        isHoliday: { type: Boolean, default:false },
        hrsHoliday: { type: Number, default:0}
     }
        // {
    //   type: [{
    //       isHoliday: { type: Boolean },
    //       hrsHoliday: { type: Number }
    //   }], default: function() {
    //     return this.isNew ? null : undefined;
    //   }}
      //es mejor tratar con objetos y no arrays
  });
  
  const WorkHour = mongoose.model('WorkHour', workHourSchema);
  export default WorkHour;

  export class WorkHourModel{
    static async create(id,data,date){

      const result = vWorkHourSchemaZod(data);
      if (!result.success) {
        return { message: 'invalid type', error: result.error };
      }
      try {

        if(date){
          //usar la funcion de query 
          const newDate=new Date(date.trim())
          const newWorkH = new WorkHour({newDate,...result.data});
          const employee = await Employee.findById(id);
          newWorkH.employee = employee;
          await newWorkH.save();
          return newWorkH;
        }

        const employee = await Employee.findById(id);
        const newWorkH = new WorkHour({employee,...result.data});
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
          const query=await queryCond(data);
          const hours=await this.getHours(area,query)
          if(hours.message){
            return{message:hours.message}
          }
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

      const reduce=filterHours.reduce((acc,hora)=>{
        //necesitamos crear la llave para tener una referencia
        const cc=hora.employee.profile.cc
        //como acc no es de ningun tipo hay que crearle
        //manualmente la estructura que tendra 
        if(!acc[cc]){
          acc[cc]={
            cc:0,
            name:'',
            horasTotales:0,
            horasExtras:0,
            data:[]
          }
        }
        
        //logica
        if(!acc[cc].name || !acc[cc].cc ){
          acc[cc].name=hora.employee.profile.name;
          acc[cc].cc=hora.employee.profile.cc;
        }
        acc[cc].horasTotales+=hora.dayHour;
        acc[cc].horasExtras+=hora.holiday.hrsHoliday
        acc[cc].data.push(hora);
        return acc;
      },{})

      return reduce;
      }catch(err){
        return {message:err.message}
      }

    }
    }