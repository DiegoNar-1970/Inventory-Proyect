import Rourter from 'express' 
import { LoginController } from '../controllers/loginController.js'; 

export const LoginRouter=Rourter();

LoginRouter.post('/',LoginController.login);