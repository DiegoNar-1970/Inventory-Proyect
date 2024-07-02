import { InfoPaimentModel } from "../models/infoPaiment/infoPaiment.js";

export class InfoPaimentController{
    static async getAll(req,res){
        const {startDate,endDate}=req.body;
        const {cc}=req.params;
        const hola=await InfoPaimentModel.create(cc,startDate,endDate);
        res.status(201).json(hola)
    }
}