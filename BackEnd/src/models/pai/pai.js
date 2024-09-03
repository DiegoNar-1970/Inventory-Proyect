import mongoose from "mongoose";
import { queryCond } from "../../helpers/queryConditios.js";
const {Schema,Types}=mongoose

const paiSchema=new Schema({
    employee:{type:Types.ObjectId,ref:'Employee'},
    date:{type:Date,default:Date.now()},
    week:[{type:Number}],
    totalHours:{type:Number},
    prima:{
        istime:{type:Boolean,default:false},
        value:{type:Number,default:0}
    },
    deductions:{type:Number},
    typesHours:[{
        name:{type:String},
        value:{type:Number}
    },],
    pai:{type:Number},
})
const Pai=mongoose.model('Pai',paiSchema);
export default Pai;

export class PaiModel{
    
    static async create(employeeId,date){
        const query=queryCond(date,employeeId);
        console.log('query',query)
        console.log(employeeId)
     
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