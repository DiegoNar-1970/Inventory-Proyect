import Role, { RoleModel } from "../models/roles/roles.js";

export class roleController{
    
    static async createRol(req,res){
        try{
            const role= await RoleModel.createRole(req.body);
            if(role.message){
               return res.status(401).json({message:'bad request' , err:role.message})
            } 
            return res.send(role);
        }catch(err){
            return res.status(500).json({message:err.message})
        }
    }

    static async allRoles(req,res){
        try{
            const roles=await RoleModel.allRoles();
            return res.send(roles);
        }catch(err){
           return res.status(401).json({message:err.message})
        }
    }
}