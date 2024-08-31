import { Router } from 'express';
import { NewsController } from '../controllers/news.js';

export const newsRouter=Router();

newsRouter.get('/',NewsController.getAll);
newsRouter.post('/:id',NewsController.create);
newsRouter.post('/',NewsController.getByCcAndDate);
newsRouter.post('/getHoursById/:id',NewsController.getByIdAndDate);
