export class logoutController{
    static async logOut(req,res){
        res
            .clearCookie('jwt')
            .status(201).json({message:'sesion cerrada'})        
    }
}