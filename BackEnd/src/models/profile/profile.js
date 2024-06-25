import mongoose from "mongoose";

const {Schema}=mongoose

const profileSchema = new Schema({
    cc: { type: Number, required: true, unique:true},
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    birthdate: { type: String, required: true },
    sex: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    eps: { type: String, required: true },
});

const Profile = mongoose.model('Profile',profileSchema);
export default  Profile;