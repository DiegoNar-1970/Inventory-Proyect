import mongoose from "mongoose";
import { queryCond } from "../../helpers/queryConditios.js";
import Employee from "../employee/employee.js";
import WorkHour from "../workHours/workHour.js";
import { validatePayment } from "./infoPaimentZod.js";
import { hourDetailSchema, newsItemSchema, paiForHoursShiftSchema, WorkHoursItem } from "./schemasComplements.js";

const {Schema,model}=mongoose

const generarNitAleatorio = () => {
    const longitud = Math.random() < 0.5 ? 9 : 10; 
    return Math.floor(Math.random() * Math.pow(10, longitud)).toString().padStart(longitud, '0');
};

const counterSchema = new Schema({
    _id: { type: String, required: true }, 
    seq: { type: Number, default: 0 }
});

const Counter = model('Counter', counterSchema);

const infoPaimentSche = new Schema({
    employee: { 
      type: mongoose.Schema.Types.ObjectId, ref: 'Employee'
    },
    News:{
        news:[newsItemSchema],
        newsStartWeek: { type: Number, default:null},
        newsEndWeek: { type: Number, default:null }
    },
    WorkHour:{
        workHours:[WorkHoursItem],
        startWeekworkHour:{type:Number},
        endWeekWorkHour:{type:Number}
    },
    deducctions:{
        pension:{type:Number},
        salud:{type:Number}
    },
    dayTimeHoliday: { type:hourDetailSchema, default:null },
    nightHoliday: { type:hourDetailSchema, default:null },
    dayTimeOvertime: { type:hourDetailSchema, default:null },
    nightOvertime: { type:hourDetailSchema, default:null },
    paiDayShift:{type:paiForHoursShiftSchema},
    paiNigthShift:{type:paiForHoursShiftSchema},
    paiDominicalShift:{type:paiForHoursShiftSchema},
    paiNigthDominicalShift:{type:paiForHoursShiftSchema},
    paiForComissions:{type:Number},
    totalPaiment:{type:Number},
    auxTransportHrs:{type:Number},
    paiOutDeductions:{type:Number},
    totalHrs:{type:Number},
    auxTransportPai:{type:Number},
    nit: { type: String, default: generarNitAleatorio },
    numberNomina: { type: Number }
  });

  infoPaimentSche.pre('save', async function(next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { _id: 'nitCounter' },
            { $inc: { seq: 1 } }, 
            { new: true, upsert: true } 
        );
        this.numberNomina = counter.seq; 
    }
    next();
});
  
  const InfoPaiment = model('InfoPaiment',infoPaimentSche)
  export default InfoPaiment;

  export class InfoPaimentModel{

    static async create(data){
        try{
            const result = new validatePayment(data);
            if (!result.success) {
                return { message: 'invalid type', error: result.error };
              }
            const infoPaiment = await InfoPaiment(result.data,{__V:0}).populate({
                path:"employee",
                select:"-__v -parafiscales -admissionDate -position",
                populate:{
                    path:"profile",
                    select:"cc name lastName",
                },
            })
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
