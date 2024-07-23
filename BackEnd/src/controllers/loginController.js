import { LoginModel } from "../models/login/login.js";

export class LoginController{

    static async login(req,res){
        try{
            const user= await LoginModel.login(req.body);

            if(user.message) return res.status(401).json({message:user.message})

            return res.send({user});

        }catch(err){
            return {message:err.message}
        }
    }
}