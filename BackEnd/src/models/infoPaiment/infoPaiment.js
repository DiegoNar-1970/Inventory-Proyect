import mongoose from "mongoose";
import { calcPaiment } from "../../helpers/filtersPaiment.js";
import { queryCond } from "../../helpers/queryConditios.js";
import Employee from "../employee/employee.js";
import WorkHour from "../workHours/workHour.js";
const {Schema,model}=mongoose

const infoPaimentSche = new Schema({
    employee: { 
      type: mongoose.Schema.Types.ObjectId, ref: 'Employee'
    },
    weeksNews:{
        startWeek:{type:Number},
        endWeek:{type:Number}
    },
    weeksHours:{
        startWeek:{type:Number},
        endWeek:{type:Number}
    },
    horasDominicales:{
            hours: { type: Number, default:0 },
            paimentForHour: { type:Number, default:11.062}
        },
    horasDominicalesNocturnas:{
            hours: { type: Number, default:0 },
            paimentForHour: { type: Number, default:13.830}
        },
    horasDiurnas:{
            hours: { type: Number, default:0},
            paimentForHour: { type: Number, default:5.531}
        },
    horasNocturnas:{
            hours: { type: Number, default:0},
            paimentForHour: { type: Number, default:9.681 }
        },
    horasExtras:{
                hours: { type: Number, default:0},
                paimentForHour: { type: Number, default:6.915 }
    },
    creationDate: { type: Date, default:Date.now() },
    sueldoBasico:{type:Number},
    sueldoTotal:{type:Number}
  });
  
  const InfoPaiment = model('InfoPaiment',infoPaimentSche)
  export default InfoPaiment;

  export class InfoPaimentModel{

    static async create(cc,data){
        try {
            const employee = await this.findEmployee(cc);
            if (!employee) {
                return { message: 'employee not found' };
            }
            const query=await queryCond(data);
            const allObjectHours = await this.findWorkHours(query, cc);
            const 
            {
                totalHolidayHours,
                totalNormalHours,
                exHours,
                basicPaiment,
                salary
            } = calcPaiment(allObjectHours);

            const infoPaiment = new InfoPaiment({
                employee,
                week: [startWeek, endWeek],
                horasDominicales: { hours: totalHolidayHours },
                horasDiurnas: { hours: totalNormalHours },
                horasExtras: { hours: exHours },
                sueldoBasico: basicPaiment,
                sueldoTotal: salary
            });
            await infoPaiment.save();
            return infoPaiment;
        } catch (err) {
            return { message: 'error saving payment info', err: err.message };
        }
    }

    static async findEmployee(cc) {
        try {
            return await Employee.findOne({}, { __v: 0 }).populate({
                path: 'profile',
                match: { cc },
                select: "-__v"
            });
        } catch (err) {
            throw new Error(`Error finding employee: ${err.message}`);
        }
    }

    static async findWorkHours(query, cc) {
        try {
            return await WorkHour.find(query,{ __v: 0 })
                .populate({
                    path: 'isHoliday',
                    select: 'isHoliday hours minutes'
                })
                .populate({
                    path: 'employee',
                    select: 'profile area',
                    populate: {
                        path: 'profile',
                        match: { cc },
                        select: 'cc name'
                    }
                })
                .exec();
        } catch (err) {
            throw new Error(`Error finding work hours: ${err.message}`);
        }
    }

    static async getById(cc,data){
        try{
            const {query}= await queryCond(data);
            const infoPaiment=await this.getInfoPaiment(cc,query);
            return infoPaiment;
        }catch(err){
            return {message:err.message}
        }
    }

    static async getInfoPaiment(cc,query){
         try{
            const infoPaiment= await InfoPaiment.find(query,{__v:0})
            .populate({
                path:'employee',
                select:'profile area',
                populate:{
                    path:'profile',
                    match:{cc},
                    select:'name lastname cc '
                }
            }).exec();
            return infoPaiment;
        }catch(err){
            throw new Error(`Error finding receipt ${err.message}`)
        }
    }

  }
