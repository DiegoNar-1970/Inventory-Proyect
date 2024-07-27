import { LoginModel } from "../models/login/login.js";

export class LoginController{

    static async login(req,res){
        try{
            const token= await LoginModel.login(req.body);
            console.log(token)

            if(token.message) return res.status(401).json({message:token.message})

            res.cookie("JWT",token)
            
            return res.status(200).json({
                ok:true,
                data:token,
                message:"Sesion Iniciada"
            });

        }catch(err){
            return res.send(500).json({message:err.message})
        }
    }
}