import cookieParser from 'cookie-parser';
import cors from 'cors';
import dot from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cron from 'node-cron';
import addAnnualVacation from './src/helpers/addForYear.js';
import { notFound } from './src/middlewares/notFound.js';
import { employeeRouter } from './src/routes/employeeRouter.js';
import { infoPaimentRouter } from './src/routes/infoPaimentRouter.js';
import { LoginRouter } from './src/routes/loginRouter.js';
import { logoutRouter } from './src/routes/logoutRouter.js';
import { newsRouter } from './src/routes/news.js';
import { paiRouter } from './src/routes/pai.js';
import { profileRouter } from './src/routes/profileRouter.js';
import { roleRouter } from './src/routes/roleRouter.js';
import { UserRouter } from './src/routes/userRouter.js';
import { verifyRouter } from './src/routes/verifyRouter.js';
import { workHourRouter } from './src/routes/worHours.js';

dot.config();

const app = express();

app.use(express.json());
app.disable('x-powered-by');

app.use(cookieParser());

app.use(cors({
        origin: 'http://localhost:5173',
        credentials:true
    }));

app.use('/login',LoginRouter);
app.use('/verify',verifyRouter);

// app.use(authAcces );


app.use('/logout',logoutRouter);
app.use('/profile',profileRouter);
app.use('/role',roleRouter);
app.use('/employee',employeeRouter);
app.use('/news',newsRouter);
app.use('/workHour',workHourRouter);
app.use('/pai',paiRouter);
app.use('/infoPaiment',infoPaimentRouter);
app.use('/register',UserRouter);


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
