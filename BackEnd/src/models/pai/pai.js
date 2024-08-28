import mongoose from "mongoose";
import { queryCond } from "../../helpers/queryConditios.js";
const {Schema,Types}=mongoose

const paiSchema=new Schema({
    employee:{type:Types.ObjectId,ref:'Employee'},
    date:{type:Date,default:Date.now()},
    week:[{type:Number}],
    totalHours:{type:Number},
    nightSurcharge:{type:Number}, //recargo nocturno
    dominicalSurcharge:{type:Number},  
    prima:{
        istime:{type:Boolean,default:false},
        value:{type:Number,default:0}
    },
    deductions:{type:Number},
    typesHours:[{
        name:{type:String},
        value:{type:Number}
    },],
    pai:{type:Types.Decimal128},
    assistanceTransport:{type:Number},
})
const Pai=mongoose.model('Pai',paiSchema);
export default Pai;

const EXTRAS_HOURS_TYPES={
    H_E_DIURNA:'HORA_EXTRA_DIURNA',
    H_E_DOMINICAL:'HORA_EXTRA_DOMINICAL',
    H_E_DOMINICAL_NOTURNA:'HORA_EXTRA_DOMINICAL_NOTURNA',
    H_E_NOCTURNA:'HORA_EXTRA_NOCTURNA'
}
const TYPE_SHIFT={
    DAY_SHIFT:'DIURNO',
    NIGHT_SHIFT:'NOCTURNO',
    DOMINICAL_SHIFT:'FESTIVO'
    //DEBE DE HABER RECARGO SI ES NOCTURNO Y DOMINICAL
    //PERO ESTOS SON APARTE SE SUMA EL TOTAL DE HORAS 
    //Y SE SACA LAS HORAS QUE SEAN NOCTURNAS Y DOMINICALES
    //PARA DARLE UN EXTRA

}
export class PaiModel{
    
    static async create(employeeId,date){
        const query=queryCond(date,employeeId);
        console.log('query',query)
        console.log(employeeId)
    //    const arrBreak=await WorkHour.find(query,{_v:0});
    }
    static async getAll(id){
        if(id){
            const paiId=await Pai.findById(id,{__v:0}).populate({
                path:'employee',
                select:'-__v'
            }).populate({
                path:'news',
                select:'-__v'
            });
            console.log('pago por id',paiId)
            if(paiId===undefined){
                return {message:'pai not found'};
            }
            return paiId;
        }
        try{
            const pais=await Pai.find({},{__v:0}).populate({
                path:'employee',
                select:'-__v'
            }).populate({
                path:'news',
                select:'-__v'
            });
            return pais;
        }catch(err){
            return {message:'error',err};
        }
    }
}