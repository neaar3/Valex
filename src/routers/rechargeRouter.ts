import { Router } from "express";
import * as rechargeController from "../controllers/rechargeCotroller.js"
import ensureAuthMiddleware from "../middlewares/ensureAuthMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import rechargeCardSchema from "../schemas/rechargeCardSchema.js";

const rechargeRouter = Router();

rechargeRouter.post('/recharge', ensureAuthMiddleware, validateSchemaMiddleware(rechargeCardSchema), rechargeController.rechargeCard);

export default rechargeRouter;