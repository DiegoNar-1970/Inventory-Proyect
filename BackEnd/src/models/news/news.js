import mongoose from "mongoose";

const {Schema}=mongoose;

const newsSchema=new Schema({
    week:{type:Number},
    date:{type:Date,default:Date.now()},
    hours:{type:Number},
})
const News=mongoose.model('News',newsSchema);
export default News;

export class NewsModel{
    static async getAll(){
        try{
            const allNews = await News.find();
            return allNews;
        }catch(err){
            return {message:err}
        }
    }
}