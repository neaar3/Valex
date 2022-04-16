import { Router } from "express";
import * as cardController from "../controllers/cardController.js"
import ensureAuthMiddleware from "../middlewares/ensureAuthMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post('/card', ensureAuthMiddleware, validateSchemaMiddleware(cardSchema), cardController.createCard);

export default cardRouter;