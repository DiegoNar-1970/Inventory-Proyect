import {Schema,model} from "mongoose";

const rolesSchema= new Schema({
    role: { type: String, required: true, unique: true },
    permissions: [String]
});

const Role=model('Role',rolesSchema);
export default Role;