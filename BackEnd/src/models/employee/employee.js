import mongoose from "mongoose";
import { validatePartialEmployee } from '../employee/employeeZod.js';
import Profile from '../profile/profile.js';
const {Schema}=mongoose;

const employeeSchema = new Schema({
    admissionDate:{type:Date, default:Date.now()},
    position:{ type: String},
    area:{ type: String },
    profile:{
        type:mongoose.Schema.Types.ObjectId,ref:'Profile'
    },
    parafiscales:{type:Boolean,default:false},
    baseSalary:{type:Number},
    assistanceTransport:{type:Number},
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

    static async create(id,data){
        const result= await validatePartialEmployee(data);
        console.log('validacion del body', result);
        if(!result.success){
            return {message:'invalid Type', err:result.error.errors};
        }

        try{
            const profile= await Profile.findById(id);
            console.log('resultado del profile',profile);

            if(!profile || profile===undefined || profile===null){
                return {message:'profile not found'};       
            }
            const employee= new Employee({...result.data,profile});
            await employee.save();
            return employee;
        }catch(err){
            return {message:err.message};
        }
    }
    static async getByid(){
        
    }
}
