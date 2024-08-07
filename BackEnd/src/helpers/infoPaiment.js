import mongoose from "mongoose";
import WorkHour from "../workHours/workHour.js";
import Employee from "../employee/employee.js";
const {Schema,model}=mongoose
import { calcPaiment } from "../../helpers/filtersPaiment.js";

const infoPaimentSche = new Schema({
    employee: { 
      type: mongoose.Schema.Types.ObjectId, ref: 'Employee'
    },
    week:[{ type: Number }],
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
    date: { type: Date, default:Date.now() },
    sueldoBasico:{type:Number},
    sueldoTotal:{type:Number}
  });
  const InfoPaiment = model('InfoPaiment',infoPaimentSche)
  export default InfoPaiment;

  export class InfoPaimentModel{
    static async create(cc,{startDate,endDate,startWeek,endWeek}){
        try {
            const newStartDate = new Date(startDate.trim());
            const newEndDate = new Date(endDate.trim());

            const employee = await this.findEmployee(cc);
            if (!employee) {
                return { message: 'employee not found' };
            }

            const allObjectHours = await this.findWorkHours(newStartDate, newEndDate, cc);

            const {
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

    static async findWorkHours(startDate, endDate, cc) {
        try {
            return await WorkHour.find({ date: { $gte: startDate, $lte: endDate } }, { __v: 0 })
                .populate({
                    path: 'holiday',
                    select: '-_id isHoliday hrsHoliday'
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

    static async getById(cc){
        const infoPaiment= await InfoPaiment.findById({},{__v:0})
        .populate({
            path:'employee',
            select:'profile area',
            populate:{
                path:'profile',
                match:{cc},
                select:'-__v name lastname cc '
            }
        })
        if(!infoPaiment){
            return {message:'receipt not found'}
        }
    }
  }
