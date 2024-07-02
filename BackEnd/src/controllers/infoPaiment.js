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
            return res.status(500).json({ message: 'Internal server error', error: err.message });
        }
    }
    static async getById(req,res){
        
        try{
            const {cc}=req.params;
            console.log(cc)
            if(!cc){
                return {message:'need identification'}
            }
            const paiment=await InfoPaimentModel.getById(cc,req.body);
            console.log('resultado',paiment);
            if(paiment.message){
                return res.status(401).json({err:paiment.message,
                    err:paiment.err.message ?  paiment.err.message : 'the employee must be registered'
                })
            }
            return res.send(paiment);
        }catch(err){
            return res.status(401).json({message:'Bad request',})

        }

    }
}