import express from 'express';
import cron from 'node-cron'
import mongoose from 'mongoose';
import {notFound} from './src/middlewares/notFound.js'
import dot from 'dotenv';
import cors from 'cors'; 
import { profileRouter } from './src/routes/profileRouter.js';
import { employeeRouter } from './src/routes/employeeRouter.js';
import { newsRouter } from './src/routes/news.js';
import  {workHourRouter} from './src/routes/worHours.js'
import {paiRouter} from './src/routes/pai.js'
import {infoPaimentRouter} from './src/routes/infoPaimentRouter.js'
import { UserRouter } from './src/routes/userRouter.js';
import {LoginRouter} from './src/routes/loginRouter.js'

import addAnnualVacation  from './src/helpers/addForYear.js';
dot.config();

const app = express();

app.use(express.json());
app.disable('x-powered-by');
app.use(cors());

app.use('/profile',profileRouter);
app.use('/employee',employeeRouter);
app.use('/news',newsRouter);
app.use('/workHour',workHourRouter);
app.use('/pai',paiRouter);
app.use('/infoPaiment',infoPaimentRouter);
app.use('/register',UserRouter);
app.use('/login',LoginRouter);

app.use(notFound);

mongoose
.connect(process.env.MONGODB_URI)
.then(()=>{
        const PORT = process.env.PORT ?? 3000;
        app.listen(PORT,()=>{
        console.log(`server listening on port http://localhost:${PORT}`)
        cron.schedule('0 0 1 * *', addAnnualVacation);
    });
})

.catch((error)=>console.log(error));

  
export default app;
