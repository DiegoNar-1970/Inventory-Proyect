import jwt from 'jsonwebtoken'
import User from '../models/register/User.js';
import Role from '../models/roles/roles.js';

export class verifyController{

    static async verify(req,res){
        const token=req.cookies
        console.log('token',token)
        console.log('request',req.cookies)
        if(!token) return res.status(401).json({message:'Unauthorized'});
        try{
            const authToken=jwt.verify(token.token,process.env.JWT_SECRET_KEY);

            const userFound=await User.findById({_id:authToken._id});
            const roles=await Role.findById({_id:userFound.roles})
            return res.send({
                name:userFound.name,
                userName:userFound.userName,
                redirection:roles.role});
        }catch(err){
            return res.status(401).json({message:err.message})
        }
    }
}
