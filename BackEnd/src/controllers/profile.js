import Profile from '../models/profile/profile.js';
import { validatePartialProfile, validateProfile } from '../models/profile/profileZod.js';

export class profileController{
    static async create (req,res) {
        const result = validateProfile(req.body)
        if(!result.success){
            return res.status(400).json({error:JSON.parse(result.error.message)})
        }
        try{
            const newProfile = new Profile(result.data);
            // await newProfile.save();
            return res.status(201).json(newProfile);
        }catch(err){
            if(err.code==11000){
                return res.status(400).json({message:"duplicate key"})
            }
            return res.status(400).json({message:err})
        }
    }   
    static async findCc(req,res){
        try{
            const {cc}=req.query;
            const profile = await Profile.findOne({cc:cc});
           return res.status(201).json(profile);
        }catch(err){
            res.status(404).json({message:`Cc ${cc} not found` })
        }
    }

    static async getAll(req,res){
        const {id} =req.query ;
        if(id)
            try{
                const profileFind = await Profile.findById(id, {__v:0});
                return res.send(profileFind);
            }catch(err){
                return res.status(404).json({message:'Not Found'});
        }
        try{
            const profiles= await Profile.find({}, {__v:0});
            return res.send(profiles);
        }catch(err){
            return res.status(400).json({message:'Bad request'});
        }
    }

    static async updateProfile(req,res){
        const result = validatePartialProfile(req.body);
        if(!result.success){
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        try{
            const {id}=req.params;
            const updateProfile = await Profile.findByIdAndUpdate(id,result.data,{new:true});
           return res.send(updateProfile);
        }catch(err){
            return res.status(400).json({message:'Bad request'});
        }
    }
    static async deleteProfile(req,res){
        try{
            const {id} =req.params;
            const deletedInfo= await Profile.findById(id);
            const deleted= await Profile.deleteOne({_id:id});
            return res.status(200).json({deleted:deletedInfo,info:deleted});
        }catch(err){
            return res.status(400).json({error:JSON.parse(result.error.message)})
        }

    }
}