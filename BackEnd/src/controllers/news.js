import mongoose from "mongoose";
import { NewsModel } from "../models/news/news.js";

export class NewsController{
    static async getAll(req,res){
        try{
            const allNews=await NewsModel.getAll();
            return res.send(allNews), 
                mongoose.connection.close();
        }catch(err){
            return res.status(404).json({message:err})
        }
        
    }
}