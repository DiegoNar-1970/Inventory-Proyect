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
    static async create(req,res){
        try{
            const news = await NewsModel.create(req.body);
            if(news.message){
                return res.status(400).json({message:news.message,
                    error:news.error
                });}
                return res.send(news)
        }catch(err){
            return res.status(404).json({message:err})
        }
    }
}