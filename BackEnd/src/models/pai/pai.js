import mongoose from "mongoose";
const {Schema}=mongoose
import {validatePartiaPaiSchema} from './paiZod.js'
import  Employee from '../employee/employee.js'
import News from '../news/news.js'

const paiSchema=new Schema({
    employee:{type:Schema.Types.ObjectId,ref:'Employee'},
    pai:{type:Number},
    date:{type:Date,default:Date.now()},
    week:{type:Number},
    news:{type:Schema.Types.ObjectId,ref:'News',
        optional:true
    },
})
const Pai=mongoose.model('Pai',paiSchema);
export default Pai;

export class PaiModel{
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
    
    static async create(employeeId,newsId,data){
        const result= await validatePartiaPaiSchema(data);
        if(!result.success){
            return {message:'validation error',
                err:result.error.errors
            }
        }
        try{
            const employee=await Employee.findById(employeeId);
            const news=await News.findById(newsId);

            if(employee===undefined){
                return {message:'employee not found'};
            }
            if(news===undefined){
                return {message:'news not found'};
            }
                const pai=new Pai({employee,news,...result.data});
                await pai.save();
                return pai;

        }catch(err){
            return {message:err}
        }

    }
}