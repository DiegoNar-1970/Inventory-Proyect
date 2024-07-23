import mongoose from 'mongoose';
import User from '../register/User.js';
import bcrypt from 'bcrypt'
const {Schema} = mongoose;

const LoginShema = new Schema({
    userName : { type : String, require : true, unique:true },
    password : { type : String, require : true },
    roles : [ { type : String, require : true } ]
});

const Login = mongoose.model('Login', LoginShema);
export default Login;

export class LoginModel{

    static async login({userName,password}){
        try{
            const user=await User.findOne({userName});
    
            if(!user) return {message:'userName not found'}
    
            const isValid=await bcrypt.compare(password , user.password )
            console.log(isValid)
    
            if(!isValid) throw new Error('password invalid');
            
                //esta es una forma de evitar enviar datos sensibles 
                //el toObject() es porque al usar el ... copia todos los datos
                //del documento en mongose, isNew etc
            const {password: _, ...publicUser}=user.toObject();
    
            console.log('sin pasword',publicUser)
    
            return publicUser

        }catch(err){
            return {message:err.message}
        }

    }
}