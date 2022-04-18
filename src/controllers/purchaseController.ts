import { Request, Response } from "express";
import * as cardService from '../services/carrdService.js';
import * as purchaseService from '../services/purchaseService.js';
import { PaymentInsertData } from "../repositories/paymentRepository.js";

export async function insertPurchase(req: Request, res: Response) {
    const { cardId, password, businessId, amount } = req.body;

    try {
        const cardResult = await cardService.findById(cardId);
        if (!cardResult) {
            return res.sendStatus(404)
        }

        const diff = cardService.verifyExpirationDate(cardResult);
        if (diff < 0) {
            return res.sendStatus(403)
        }

        const bussinesResult = await purchaseService.findById(businessId);
        if (!bussinesResult) {
            return res.sendStatus(404)
        }

        if (cardResult.type !== bussinesResult.type) {
            return res.sendStatus(403)
        }

        const passwordIsValid = purchaseService.verifyPassword(cardResult, password);
        if (!passwordIsValid) {
            return res.sendStatus(403)
        }
        // console.log(cardResult);
        // console.log(bussinesResult);

        const timestamp = new Date().getTime();

        const paymentData = {
            cardId: cardId,
            businessId: businessId,
            timestamp: timestamp,
            amount: amount
        } as PaymentInsertData;

        await purchaseService.insert(paymentData);

        res.sendStatus(200);
    } catch (error) {
        console.log(error)
    }
};