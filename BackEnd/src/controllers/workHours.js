import mongoose from "mongoose";
import { WorkHourModel } from "../models/workHours/workHour.js";

export class WorkHourController{
    static async getAll(req,res){
        const {id}=req.query;
        if(id){
          try{
            const worHour= await WorkHourModel.getAll(id);
            if(worHour.message){
              return res.status(400).json(worHour.message);
            }
            return res.status(201).json(worHour);
          }catch(err){
            return res.status(404).json({message:err.message});
          }
        }
        const worHours= await WorkHourModel.getAll();
        return res.send(worHours);
    }
    static async create(req,res){
        const { id } = req.params;
        const result = req.body;
    if (!result || !id) {
        return res.status(400).json({ message: 'insufficient params' });
    }
    try {
      const newWorkH = await WorkHourModel.create(id, result);
      if (newWorkH.message) {
        return res.status(400).json({ message: newWorkH.message,
            error:newWorkH.error
         });
      }
      return res.status(201).json(newWorkH);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
    }
}