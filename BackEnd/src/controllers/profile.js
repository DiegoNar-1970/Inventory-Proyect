import profile  from '../models/perfil/profile.js'
import {validateProfile} from '../models/perfil/profileZod.js'

export class profileController{
    static async create (req,res) {
        const result = validateProfile(req.body)
        console.log(req.body)
        if(!result.success){
            return res.status(400).json({error:JSON.parse(result.error.message)})
        }
        try{
            const newProfile = new profile(result.data)
            console.log(newProfile)
            const saveProfile= await newProfile.save()
            res.status(201).json(saveProfile)
        }catch(err){
            res.status(400).json({message:'Bad Request'})
        }
    }
}