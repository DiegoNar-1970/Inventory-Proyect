import { LoginModel } from "../models/login/login.js";

export class LoginController{

    static async login(req,res){
        try{
            const {redirection,token,role}= await LoginModel.login(req.body);  

            if(token.message) return res.status(401).json({message:token.message})

            // return (
            //     res
            //      .cookie("JWT", token, {
            //         httpOnly: true,
            //         maxAge: 100 * 60 * 60
            //      })
            //      .redirect(`${foundRole}`))

            return (
             res
                 .cookie("token", token,{
                    maxAge: 100 * 60 * 60
                 })
                 .status(200).json({
                      ok:true,
                      redirection:redirection,
                      message:"Sesion Iniciada",
                      role:role,
                 }))

        }catch(err){
            return res.status(500).json({message:err.message})
        }
    }
}