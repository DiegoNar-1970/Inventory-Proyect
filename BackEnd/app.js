import express from 'express';
import mongoose from 'mongoose';
import {notFound} from './src/middlewares/notFound.js'
import dot from 'dotenv';
import { workerRouter } from './src/routes/Empleado.js';

dot.config();

const app = express();

app.use(express.json());

app.disable('x-powered-by');


app.use('/workers',workerRouter)

app.use(notFound);

mongoose
.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('completed')
        const PORT = process.env.PORT ?? 3000;
        app.listen(PORT,()=>{
        console.log(`server listening on port http://localhost:${PORT}`)
    });
})

.catch((error)=>console.log(error));

  
export default app;