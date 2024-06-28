import mongoose from "mongoose";
import Employee from "../employee/employee.js";
import {validateNewsSchema} from './newsZod.js'

const {Schema}=mongoose;

const newsSchema=new Schema({
    week:{type:Number},
    date:{type:Date,default:Date.now()},
    hours:{type:Number},
})
const News=mongoose.model('News',newsSchema);
export default News;

export class NewsModel{
    static async getAll(){
        try{
            const allNews = await News.find({},{__v:0});
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
            const newNews = new News(result.data);
            await newNews.save();
            return newNews;
        }catch(err){
            return {message:'created error',err:err}
        }
    }

}