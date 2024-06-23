import {Router} from 'express';
import {profileController} from '../controllers/profile.js'

export const profileRouter=Router();

profileRouter.post ('/', profileController.create);
profileRouter.get ('/', profileController.getAll);
profileRouter.delete('/:id', profileController.deleteProfile);
profileRouter.patch('/:id', profileController.updateProfile);