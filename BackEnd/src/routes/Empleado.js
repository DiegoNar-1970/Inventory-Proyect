import {Router} from 'express';

export const workerRouter=Router();

workerRouter.get('/',(req,res)=>{
    res.send("Hello word")
});