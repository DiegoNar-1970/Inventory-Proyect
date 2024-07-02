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
    static async create(cc,startDate,endDate){
        const normalHour=5.531;
        const exNormalHour=6.915;
        const holidayHour=11.062;
        //se recibe un string en formato YYYY/MM/DD 
        //hay que volverlo un tipo Date 
        const newStartDate = new Date(startDate.trim());
        const newEndDate = new Date(endDate.trim()); 
        
        const allHours=await WorkHour.find({date:{$gte : newStartDate, $lte : newEndDate}
        },{__v:0})
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
        ///comvertir esto en un helper para ahorrar codigo
         const filteredHours = allHours.filter(workHour => workHour.employee !== null);
         const {normalHours,hourHolidays}= Object.groupBy(filteredHours,(hours)=>{
            if(hours.holiday === null) return "normalHours"
            return 'hourHolidays'
         });
         const totalNormalHours = normalHours.reduce((sum, workHour) => sum + workHour.dayHour, 0);
         let totalHolidayHours = 0;
         hourHolidays.forEach(workHour => {
             workHour.holiday.forEach(holiday => {
                 totalHolidayHours += holiday.hrsHoliday;
                });
            });
        
        if(totalNormalHours > 94 & totalHolidayHours !== 0 ){
                let exHours = totalNormalHours - 94 ;
                let PaiHoliday=totalHolidayHours * 11.062
                let basicPai = (exHours * 6.915) + (94 * 5.531) + PaiHoliday;
            }
            if(totalNormalHours < 94 & totalHolidayHours !== 0 ){
                let PaiHoliday=totalHolidayHours * 11.062
                let basicPai = (totalNormalHours * 5.531) + PaiHoliday;
            }
         if(totalNormalHours > 94 & totalHolidayHours === 0 ){
            let exHours = totalNormalHours - 94 ;
            let basicPai = (exHours * 6.915)+(94 * 5.531);
            }
            if(totalNormalHours < 94 & totalHolidayHours === 0 ){
                let basicPai = exHours * 5.531;
            }



         
        
         // ahora debemos calcular el suelo 
         return {normalHours,hourHolidays};
    }
  }
