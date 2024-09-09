import mongoose from "mongoose";
import { queryCond } from "../../helpers/queryConditios.js";
import { validateNewsSchema } from './newsZod.js';

const {Schema}=mongoose;

const newsSchema=new Schema({
    employee: { 
        type: Schema.Types.ObjectId, ref: 'Employee'
      },
    week:{type:Number},
    creationDate:{type:Date,default:Date.now()},
    extraHours:{
        type:{type:String,default:'NO_APLICA'},
        hours:{type:Number,default:0},
        minutes:{type:Number,default:0},
        percentage:{type:Number,default:0},
      },
      comissions:{
        type:{type:String,default:'NO_APLICA'},
        apply:{type:Boolean,default:false},
        value:{type:Number,default:0},
        hrs:{type:Number,default:0}
      }
})
const News=mongoose.model('News',newsSchema);
export default News;

export class NewsModel{
    static async getByIdAndDate(id,data){
        try{
            const query=queryCond(data,id);
            const hours=await this.getHoursById(query);
            if(hours.message){
                return {message:hours.message};
            }
            return hours;
        }catch(err){
            return {message:err.message};
        }

    }
    
    static async getByCcAndDate(cc,data){
        try{
            const query=queryCond(data);
            const hours=await this.getHoursByCc(cc,query);
            if(hours.message){
                return {message:hours.message};
            }
            return hours;
        }catch(err){
            return {message:err.message}
        }
        
    }
    
    static async getHoursById(query){
        try{
            const hours = await News.find(query,{__v:0}).populate({
                path:"employee",
                select:"-__v -parafiscales -admissionDate -position",
                populate:{
                    path:"profile",
                    select:"cc name lastName",
                },
            }).exec();

            if(hours.length === 0){
                return {message:'No se encontraron horas'};
            }
            
            return hours;

        }catch(err){
            return {message:err.message}
        }
    }
    
    static async getHoursByCc(cc,query){
        try{
            const hours = await News.find(query,{__v:0}).populate({
                path:'employee',
                select:'area profile',
                populate:{
                    path:'profile',
                    select:'name cc lastName ',
                    match:{cc:cc}
                }}
            ).exec();

            if(hours.length === 0){
                return {message:'No se encontraron horas'};
            }

            return hours;
        }catch(err){
            return {message:err.message};
        }
    }
    
    static async getAll(){
        try{
            const allNews = await News.find({},{__v:0})
            .populate({
                path:'employee',
                select:'-__v -parafiscales -baseSalary -admissionDate',
                populate:{
                    path:'profile',
                    select:'-__v -birthdate -sex'
                }
            });
            return allNews;
        }catch(err){
            return {message:err}
        }
    }

    static async create(data){
        const result= await validateNewsSchema(data);
        if(!result.success){
            return {message:'invalid type',error:result.error}
        }
        try{
            const newNews = new News({...result.data});
            if(newNews.comissions.type === 'NO_APLICA' && newNews.extraHours.type==='NO_APLICA' ){
                return newNews;
            }
            await newNews.save();
            return newNews;
        }catch(err){
            return {message:'created error',err:err}
        }
    }

    static async groupByType(id,data,newsEndW,newsStartW){

        const query=queryCond(data);
        const employeeId = new mongoose.Types.ObjectId(id);
        
        let news = await News.aggregate([
          {
            $match: {
              ...query,
              employee: employeeId 
            }
          },
          {
            $group:{
            _id: {
                extraHours:"$extraHours.type",
                comissions:"$comissions.type",
                employee: "$employee"
            }, 
            totalMinutes: { $sum:"$extraHours.minutes"},
            totalHoras: { $sum:"$extraHours.hours" },
            commissionHours: { $sum:"$comissions.hrs" }
            
          }
        },
        {
            $project: {
            _id: 1,
            calcHoursTotal: {
                $sum: [
                  "$totalHoras", 
                  { $divide: ["$totalMinutes", 60] }]
              },
              employee: 1,
              commissionHours:1,
          }
        }
        ]);

        if(news.length === 0){
            return {message:'No se Encontraron Datos Por favor ingresa fechas con registros'}
        }
        
        news={
             ...news,
            endWeek:newsEndW,
            startWeek:newsStartW,
        }
        
        return{news}
      }
}