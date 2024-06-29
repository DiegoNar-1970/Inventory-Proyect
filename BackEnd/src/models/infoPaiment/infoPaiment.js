import mongoose from "mongoose";
const {Schema,Types,model}=mongoose

const infoPaimentSche = new Schema({
    employee: { 
      type: mongoose.Schema.Types.ObjectId, ref: 'Employee'
    },
    week:[{ type: number }],
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