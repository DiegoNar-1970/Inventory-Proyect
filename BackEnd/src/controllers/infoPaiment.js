import { InfoPaimentModel } from "../models/infoPaiment/infoPaiment.js";

export class InfoPaimentController{
    static async create(req,res){
        const {cc}=req.params;
        if(!cc){
            return res.status(400).json({message:"cc is required"})
        }
        try{
            const paiment=await InfoPaimentModel.create(cc,req.body);
            if(paiment.message){
                return res.status(400).json({message:paiment.message})
            }
            res.status(201).json(paiment)
        }catch(err){

        }
    }
}