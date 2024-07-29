import { Router } from "express";
import { verifyController} from '../controllers/verifyController.js';

export const verifyRouter=Router();

verifyRouter.get('/',verifyController.verify);