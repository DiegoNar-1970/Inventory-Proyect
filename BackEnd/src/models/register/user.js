import mongoose from "mongoose";
const {Schema}=mongoose
 const registerSchema=new Schema({
    name : { type : String, require : true },
    userName : { type : String, require : true, unique:true },
    password : { type : String, require : true },
    roles :  { type : Schema.Types.ObjectId, ref:'Role', require:true} 
 })