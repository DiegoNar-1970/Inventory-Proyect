import { LoginModel } from "../models/login/login.js";

export class LoginController{

    static async login(req,res){
        try{
            const {foundRole,token}= await LoginModel.login(req.body);  
            console.log(token);    
            
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
                    httpOnly: true,
                    maxAge: 100 * 60 * 60
                 })
                 .status(200).json({
                      ok:true,
                      redirection:foundRole,
                      message:"Sesion Iniciada"
                 }))

        }catch(err){
            return res.status(500).json({message:err.message})
        }
    }
}