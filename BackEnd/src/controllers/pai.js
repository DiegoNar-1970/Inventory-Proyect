import { PaiModel } from "../models/pai/pai.js"
export class PaiController{
    static async geAll(req,res){
        const {id}=req.query;
        if(id){
            const paiId= await PaiModel.getAll(id);
            if(paiId.message){
                return res.status(400).json({err:paiId.message})
            }
            return res.send(paiId)
        }
        try{
            const pais= await PaiModel.getAll();
            return res.send(pais);
        }catch(err){
            return res.status(400).json({err:err.message});
        }
    }

    static async create(req,res){
        const {employee,news}=req.query;
        if(!employee){
            return res.status(400).json({err:"employee is required"})
        }
        if(!news){
            return res.status(400).json({err:"news is required"})
        }
        try{
            const pai=await PaiModel.create(employee,news,req.body);
            if(pai.message){
                return res.status(400).json({message:pai.message,
                    err:pai.err
                })
            }
            return res.status(201).json(pai)
        }catch(err){
            return res.status(400).json({err:err.message})
        }
    }
}