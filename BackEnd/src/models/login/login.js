import mongoose from 'mongoose';
const {Schema} = mongoose;

const LoginShema = new Schema({
    name : { type : String, require : true },
    userName : { type : String, require : true, unique:true },
    password : { type : String, require : true },
    roles : [ { type : String, require : true } ]
});

const Login = mongoose.model('Login', LoginShema);
export default Login;

export class LoginModel{
    static async createUser({userName,password,roles}){

    }
}