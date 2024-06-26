import mongoose from 'mongoose'
import { date } from 'zod';

const {Schema,model}=mongoose;

const performanceSche = new Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    performance: { type: String, required: true },
    date: { type: Date, default:Date.now() },
});
const Performance = model('Performance', performanceSche);
export default Performance;