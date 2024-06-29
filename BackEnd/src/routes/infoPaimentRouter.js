import {Router} from 'express'
import {InfoPaimentController} from '../controllers/infoPaiment.js'

export const infoPaimentRouter=Router();

infoPaimentRouter.get('/',InfoPaimentController.getAll);