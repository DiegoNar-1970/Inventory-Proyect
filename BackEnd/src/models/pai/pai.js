import mongoose from "mongoose";
const {Schema}=mongoose

const paiSchema=new Schema({
    employe:{type:Schema.Types.ObjectId,ref:'Employee'},
    pai:{type:number},
    date:{type:Date,default:Date.now()},
    week:{type:number},
    news:{type:Schema.Types.ObjectId,ref:'News'},
})
const Pai=mongoose.model('Pai',paiSchema);
export default Pai;