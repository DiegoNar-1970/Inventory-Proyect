import mongoose from "mongoose";
import { NewsModel } from "../models/news/news.js";

export class NewsController{
    static async getByIdAndDate(req,res){
        const data=req.body;
        const {id}=req.params;
        try{
            const result=await NewsModel.getByIdAndDate(id,data);
            if(result.message){
                return res.status(400).json({message:result.message})
            }
            return res.send(result)
        }catch(err){
            return res.status(400).json({message:err.message})
        }

    }

    static async getByCcAndDate(req,res){
        try{
            const data=req.body
            const {cc}=req.body
            const result=await NewsModel.getByCcAndDate(cc,data);
            if(result.message){
                return res.status(400).json({message:result.message})
            }
            return res.send(result)
        }catch(err){
            return res.status(400).json({message:err.message})
        }    

    }
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
        const {id}=req.params;
        if(!id){
            res.status(400).json({message:'arguments required'})
        }
        try{
            const news = await NewsModel.create(id,req.body);
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