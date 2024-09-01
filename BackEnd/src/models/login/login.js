import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../register/User.js';
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
       
            const user=await User.findOne({userName},{__v:0});
            if(!user) throw new Error ('userName not found')

            const isValid=await bcrypt.compare(password , user.password );
            if(!isValid) throw new Error ('incorrect password');
        try{
                    //esta es una forma de evitar enviar datos sensibles 
                    //el toObject() es porque al usar el ... copia todos los datos
                    //del documento en mongose el cual contiene configuracion isNew etc
            const foundRole=await Role.findById({_id:user.roles},{__v:0})

            const {password: _, ...publicUser}=user.toObject();

            const token = jwt.sign( publicUser, process.env.JWT_SECRET_KEY);
            console.log('role models',publicUser)
            return {publicUser,token, redirection:foundRole.role, role:foundRole};

        }catch(err){
            return {message:err.message};
        }

    }
}