import mongoose from "mongoose";
import WorkHour from "../workHours/workHour.js";
const {Schema,Types,model}=mongoose

const infoPaimentSche = new Schema({
    employee: { 
      type: mongoose.Schema.Types.ObjectId, ref: 'Employee'
    },
    week:[{ type: Number }],
    horasDominicales:{
        type: [{
            hours: { type: Types.Decimal128 },
            paimentForHour: { type:Types.Decimal128, default:10.000}
        }]},
    horasDominicalesNocturnas:{
        type: [{
            hours: { type: Types.Decimal128 },
            paimentForHour: { type: Types.Decimal128, default:12.300 }
        }]},
    horasDiurnas:{
        type: [{
            hours: { type: Types.Decimal128 },
            paimentForHour: { type: Types.Decimal128, default:52.00}
        }]},
    horasNocturnas:{
        type: [{
            hours: { type: Types.Decimal128 },
            paimentForHour: { type: Types.Decimal128, default:8.000 }
        }]},
        horasExtras:{
            type: [{
                hours: { type: Types.Decimal128 },
                paimentForHour: { type: Types.Decimal128, default:4.500 }
            }]},
    date: { type: Date, default:Date.now() },
    sueldoBasico:{type:Types.Decimal128},
    pagoHoras:{type:Types.Decimal128},
    sueldoTotal:{type:Types.Decimal128}
  });
  const InfoPaiment = model('InfoPaiment',infoPaimentSche)
  export default InfoPaiment;

  export class InfoPaimentModel{
    static async create(cc){
        //Hallar el total de horas 
        console.log(cc)
        const allHours=await WorkHour.find({},{__v:0})
        .populate({
            path: 'holiday',
            select: '-_id isHoliday hrsHoliday'
        })
        .populate({
            path:'employee',
            select:'profile area',
            populate:{
                path:'profile',
                match:{'cc':cc},
                select:'cc name '
            }
        })
        .exec();
        const filteredHours = allHours.filter(workHour => workHour.employee !== null);
        console.log('Todos los documentos WorkHour:', allHours);
        console.log('Documentos WorkHour después de filtrar:', filteredHours);
        return allHours
    }
  }
