import {Schema,model} from "mongoose";
import {validatePartialUser} from './userZod.js';
import bcrypt from 'bcrypt'


 const UserSchema=new Schema({
    name : { type : String, require : true },
    userName : { type : String, require : true, unique:true },
    password : { type : String, require : true },
    roles :  { type : Schema.Types.ObjectId, ref:'Role', require:false} 
 })

const User = model('User',UserSchema);
export default User;

export class UserModel{

   static async createUser(body){
      const result=validatePartialUser(body);

      if(!result.success){
         return { message: JSON.parse(result.error.message) };
      }
      try{
         const password=result.data.password;
         const hashedPassword= await bcrypt.hash(password,10)
         const user=new User({
            name:result.data.name,
            userName:result.data.userName,
            password:hashedPassword
         })
         await user.save()
         return user
      }catch(err){
         return {message:err.message}
      }
   }
}