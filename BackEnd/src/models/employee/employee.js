import mongoose from "mongoose";
const {Schema}=mongoose;
import {validatePartialEmployee} from '../employee/employeeZod.js'
import { optional } from "zod";

const employeeSchema = new Schema({
    admissionDate:{type:Date, default:Date.now()},
    position:{ type: String},
    area:{ type: String },
    shift:{ type: String},
    profile:[{
        type:mongoose.Schema.Types.ObjectId,ref:'Profile',
        optional:true
    }]
});
const Employee=mongoose.model('Employee',employeeSchema);
export default Employee;
export class EmployeeModel{
    static async findByIdAndUpdate(id,data){
        const result= validatePartialEmployee(data)
        if(!result.success){
            return { message: JSON.parse(result.error.message) };
        }
        try{
            const employeeUpd= await Employee.findByIdAndUpdate(id,result.data,{new:true});
            return employeeUpd;
        }catch(err){
            return { message: JSON.parse(err.message) };
        }
    }

    static async fidnAndDelete(id){
        try{
            const deleted=Employee.findByIdAndDelete(id);
            return deleted;
        }catch(err){
            return { message:err.message};
        }
    }
}
