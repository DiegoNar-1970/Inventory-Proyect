import Profile  from '../models/perfil/profile.js'
import {validateProfile,validatePartialProfile} from '../models/perfil/profileZod.js'

export class profileController{
    static async create (req,res) {
        const result = validateProfile(req.body)
        if(!result.success){
            return res.status(400).json({error:JSON.parse(result.error.message)})
        }
        try{
            const newProfile = new Profile(result.data)
            const saveProfile= await newProfile.save()
            res.status(201).json(saveProfile)
        }catch(err){
            res.status(400).json({message:'Bad Request'})
        }
    }

    static async getAll(req,res){
        const {id} =req.query ;
        if(id)
            try{
                const profileFind = await Profile.findById(id);
                console.log(profileFind);
                res.send(profileFind);
            }catch(err){
                res.status(404).json({message:'Not Found'});
            }
        try{
            const profiles= await Profile.find();
            res.send(profiles);
        }catch(err){
            res.status(400).json({message:'Bad request'});
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
            res.send(updateProfile);
        }catch(err){
            res.status(400).json({message:'Bad request'});
        }
    }
    static async deleteProfile(req,res){
        try{
            const {id} =req.params;
            const deletedInfo= await Profile.findById(id);
            const deleted= await Profile.deleteOne({_id:id});
            res.status(200).json({deleted:deletedInfo,info:deleted});
        }catch(err){
            res.status(400).json({message:'Bad request'});
        }

    }
}