import mongoose from 'mongoose';
const {model,Schema} =mongoose

const permissionSche = new Schema({
    employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    reason: { type: String, required: true },
    paiState: { type: Boolean, required: true },
    paiValue: { type: Number, required: true },
    startDate: { type: Date, default:Date.now()},
    endDate: { type: Date, required: true },
  });
  
  const Permission = model('Permission', permissionSche);
  export default Permission;