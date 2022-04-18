import { Router } from "express";
import * as cardController from "../controllers/cardController.js"
import ensureAuthMiddleware from "../middlewares/ensureAuthMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import activateCardSchema from "../schemas/activateCardSchema.js";
import createCardSchema from "../schemas/createCardSchema.js";
import visualizeBalanceSchema from "../schemas/visualizeBalanceSchema.js";

const cardRouter = Router();

cardRouter.post('/card/create', ensureAuthMiddleware, validateSchemaMiddleware(createCardSchema), cardController.createCard);
cardRouter.post('/card/activate', validateSchemaMiddleware(activateCardSchema), cardController.activateCard);
cardRouter.post('/card/balance', validateSchemaMiddleware(visualizeBalanceSchema), cardController.visualizeBalance);

export default cardRouter;