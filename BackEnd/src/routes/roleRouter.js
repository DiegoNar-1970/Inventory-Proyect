import {Router} from 'express';
import { roleController } from '../controllers/roleController.js';

export const roleRouter=Router();

roleRouter.post('/',roleController.createRol);
roleRouter.get('/',roleController.allRoles);