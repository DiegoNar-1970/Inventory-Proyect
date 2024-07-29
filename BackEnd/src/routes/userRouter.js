import { Router } from "express";
import { UserController } from "../controllers/user.js";

export const UserRouter=Router();

UserRouter.post('/', UserController.createUser);
