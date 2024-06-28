import {Router}from "express";
import { PaiController } from "../controllers/pai.js";

export const paiRouter=Router();

paiRouter.get('/',PaiController.geAll);
paiRouter.post('/',PaiController.create);
