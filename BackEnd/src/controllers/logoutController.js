export class logoutController{
    static async logOut(req,res){
        
        try{
            return res
            .clearCookie('token')
            .status(201)
            .json({message:'sesion cerrada'})        
 
        }catch(err){
            console.error('Error durante el logout:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });

        }          
    };
}