import { UserModel } from "../models/register/User.js";

export class UserController{
    static async createUser(req,res){
        try{
            const result=await UserModel.createUser(req.body)
            return res.send(result)
        }catch(err){
            return {message:err.message}
        }
    }
}