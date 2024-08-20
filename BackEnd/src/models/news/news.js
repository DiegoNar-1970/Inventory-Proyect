import mongoose from "mongoose";
import Employee from "../employee/employee.js";
import { validateNewsSchema } from './newsZod.js';

const {Schema}=mongoose;

const newsSchema=new Schema({
    employee: { 
        type: Schema.Types.ObjectId, ref: 'Employee'
      },
      //cambiar a type numeric ya que las novedades solo son semanales no quincenales
    week:[{type:Number}],
    date:{type:Date,default:Date.now()},
    hours:{type:Number},
})
const News=mongoose.model('News',newsSchema);
export default News;

export class NewsModel{
    static async getAll(){
        try{
            const allNews = await News.find({},{__v:0})
            .populate({
                path:'employee',
                select:'-__v -shift -admissionDate',
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

    static async create(id,data){
        const employee = await Employee.findById(id,{__v:0})
        .populate('profile',{__v:0});
        if(employee===undefined || employee===null){
            return {message:'Employee not found.'}
        }
        const result= await validateNewsSchema(data);
        if(!result.success){
            return {message:'invalid type',error:result.error}
        }
        try{
            const newNews = new News({employee,...result.data});
            await newNews.save();
            return newNews;
        }catch(err){
            return {message:'created error',err:err}
        }
    }

}