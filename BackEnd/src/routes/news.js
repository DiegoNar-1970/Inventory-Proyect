import { Router } from 'express';
import {NewsController} from '../controllers/news.js'

export const newsRouter=Router();

newsRouter.get('/',NewsController.getAll);
