import mongoose from 'mongoose';
import User from '../register/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Role from '../roles/roles.js';
const {Schema} = mongoose;

const LoginShema = new Schema({
    userName : { type : String, require : true },
    password : { type : String, require : true },
});

const Login = mongoose.model('Login', LoginShema);
export default Login;

export class LoginModel{

    static async login({userName,password}){
        try{
            const user=await User.findOne({userName},{__v:0});
            
            const foundRole=await Role.findById({_id:user.roles})

            if(!user) return {message:'userName not found'}
    
            const isValid=await bcrypt.compare(password , user.password )
    
            if(!isValid) throw new Error('password invalid');
            
                //esta es una forma de evitar enviar datos sensibles 
                //el toObject() es porque al usar el ... copia todos los datos
                //del documento en mongose el cual contiene configuracion isNew etc
            const {password: _, ...publicUser}=user.toObject();
            const token=jwt.sign(publicUser,process.env.JWT_SECRET_KEY);
            return {token,foundRole:foundRole.role};
        }catch(err){
            return {message:err.message};
        }

    }
}