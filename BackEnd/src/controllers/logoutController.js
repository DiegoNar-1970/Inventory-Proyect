export class logoutController{
    static async logOut(req,res){
        res
            .clearCookie('JWT')
            .status(201).json({message:'sesion cerrada'})        
    };
}