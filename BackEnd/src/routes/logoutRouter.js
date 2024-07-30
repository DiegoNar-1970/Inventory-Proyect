import { Router } from "express";
import { logoutController } from "../controllers/logoutController.js";

export const logoutRouter=Router();

logoutRouter.get('/',logoutController.logOut)