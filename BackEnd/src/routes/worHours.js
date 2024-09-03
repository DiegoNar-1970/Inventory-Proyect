import { Router } from "express";
import { WorkHourController } from "../controllers/workHours.js";

export const workHourRouter=Router();

workHourRouter.get('/',WorkHourController.getAll);
workHourRouter.post('/:id',WorkHourController.create);
workHourRouter.post('/',WorkHourController.calcHours);
workHourRouter.post('/just/:id',WorkHourController.groupByType);
