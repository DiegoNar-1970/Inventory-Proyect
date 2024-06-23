import {Router} from 'express';
import {profileController} from '../controllers/profile.js'
export const workerRouter=Router();

workerRouter.post ('/', profileController.create);