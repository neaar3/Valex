import { Router } from "express";
import * as cardController from "../controllers/cardController.js"
import ensureAuthMiddleware from "../middlewares/ensureAuthMiddleware.js";

const cardRouter = Router();

cardRouter.post('/card', ensureAuthMiddleware, cardController.createCard);

export default cardRouter;