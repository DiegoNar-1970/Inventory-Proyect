import {Schema,model} from "mongoose";
import { validateRole } from "./roleZod.js";

const rolesSchema= new Schema({
    role: { type: String, required: true, unique: true },
    permissions: [String]
});

const Role=model('Role',rolesSchema);
export default Role;

export class RoleModel{
   static async createRole(body){
      try{
        const result=validateRole(body)
        if(!result.success){
          return {message:result.error.errors, }
        }
        const role= await new Role(result.data);

        await role.save();

        return role;  

      }catch(err){
          return {message:err.message};
      }
   } 
   static async allRoles(){
    const roles=await Role.find({},{__v:0});
    console.log(roles)
    return roles
   }
}