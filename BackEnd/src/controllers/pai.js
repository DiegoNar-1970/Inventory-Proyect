import { PaiModel } from "../models/pai/pai.js";
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
        const {employee}=req.query;
        console.log('req,body',req.body)
        const pai=await PaiModel.create(employee,req.body);


    }
}