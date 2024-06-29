import { InfoPaimentModel } from "../models/infoPaiment/infoPaiment.js";

export class InfoPaimentController{
    static async getAll(req,res){
        const {cc}=req.params;
        console.log(cc);
        const total=await InfoPaimentModel.create(cc)
        res.status(201).json(total)
    }
}