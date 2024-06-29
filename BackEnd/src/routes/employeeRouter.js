import { Router } from 'express';
import { employeeController } from '../controllers/employee.js';

export const employeeRouter=Router();

employeeRouter.get('/',employeeController.getAll);
employeeRouter.post('/',employeeController.create);
employeeRouter.patch('/:id',employeeController.update);
employeeRouter.delete('/:id',employeeController.delete);