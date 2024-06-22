import express, { json } from 'express';
import mongoose from 'mongoose';
import dot from 'dotenv';
import { workerRouter } from './src/routes/Empleado.js';
dot.config();

const app= express();
app.use(json());
app.disable('x-powered-by');


app.use('/workers',workerRouter)



mongoose
.connect(process.env.MONGODB_URI)
.then(()=>console.log('CONECTION COMPLETE'))
.catch((error)=>console.log(error));

const PORT = process.env.PORT ?? 3000;
app.listen(PORT,()=>{
    console.log(`server listening on port http://localhost:${PORT}`)
});
  