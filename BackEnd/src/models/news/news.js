import mongoose from "mongoose";

const {Schema}=mongoose;

const newsSchema=new Schema({
    week:{type:Number},
    date:{type:Date,default:Date.now},
    hours:{type:Number},
})
const News=mongoose.model('News',newsSchema);
export default News;