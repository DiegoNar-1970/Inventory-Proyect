import {Schema,model} from "mongoose";
import { validateUser} from './userZod.js';
import bcrypt from 'bcrypt'
import Role from "../roles/roles.js";


 const UserSchema=new Schema({
    name : { type : String, require : true },
    userName : { type : String, require : true, unique:true },
    password : { type : String, require : true },
    roles :  { type : Schema.Types.ObjectId, ref:'Role'} 
 })

const User = model('User',UserSchema);
export default User;

export class UserModel{

   static async createUser(body){
      const result=validateUser(body);
 
      if(!result.success){
         return { message: JSON.parse(result.error.message) };
      }
      try{
         const password=result.data.password;
         const nameRole=result.data.roles
         console.log('este es el nombre que llega',nameRole)

         const hashedPassword= await bcrypt.hash(password,10);

         const role=await Role.findOne({role:nameRole})

         const user=new User({
            name:result.data.name,
            userName:result.data.userName,
            password:hashedPassword,
            roles:role
         });
         
         await user.save();
         return user;
      }catch(err){
         return {message:err.message};
      }
   }
}