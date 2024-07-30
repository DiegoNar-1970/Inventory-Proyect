import jwt from 'jsonwebtoken'

export const authAcces=(req,res,next)=>{
    try{
        const token=req.cookies.token;

        if(!token)return res.status(401).json({message:'No token, authorization denied'});

        const validatePayload=jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        req.user=validatePayload
        next();
        
    }catch(err){
        return res.status(401).json({
            ok:false,
            message:'invalid token',
            err:err.message})
    } 
}