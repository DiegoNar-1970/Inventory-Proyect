import mongoose from "mongoose";
const {Schema}=mongoose;

const employeSchema = new Schema({
    position:{ type: String, required: true },
    area:{ type: String, required: true },
    shift:{ type: String, required: true },
    profile:[{
        type:mongoose.Schema.Types.ObjectId,ref:'Profile'
    }]
});

const Employe=mongoose.model('Employe',employeSchema);

export default Employe;
