import jwt from 'jsonwebtoken'

export const authAcces=(req,res,next)=>{
    try{
        const token=req.cookies.JWT
        const validatePayload=jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log({validatePayload});
        next();
    }catch(err){
        return res.status(401).json({
            ok:false,
            message:'invalid token',
            err:err.message})
    } 
}