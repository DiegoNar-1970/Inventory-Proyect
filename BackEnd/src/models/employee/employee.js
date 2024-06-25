import mongoose from "mongoose";
const {Schema}=mongoose;

const employeeSchema = new Schema({
    admissionDate:{type:date,default:Date.now},
    position:{ type: String, required: true },
    area:{ type: String, required: true },
    shift:{ type: String, required: true },
    profile:[{
        type:mongoose.Schema.Types.ObjectId,ref:'Profile'
    }]
});

const Employee=mongoose.model('Employee',employeeSchema);

export default Employee;
