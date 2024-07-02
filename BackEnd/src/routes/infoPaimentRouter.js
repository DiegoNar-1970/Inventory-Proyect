import {Router} from 'express'
import {InfoPaimentController} from '../controllers/infoPaiment.js'

export const infoPaimentRouter=Router();

infoPaimentRouter.post('/:cc',InfoPaimentController.create);