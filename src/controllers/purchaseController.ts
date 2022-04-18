import { Request, Response } from "express";
import * as cardService from '../services/cardService.js';
import * as purchaseService from '../services/purchaseService.js';
import * as businessService from '../services/businessService.js';
import { PaymentInsertData } from "../repositories/paymentRepository.js";

export async function insertPurchase(req: Request, res: Response) {
    const { cardId, password, businessId, amount } = req.body;

    const cardResult = await cardService.ensureCardExists(cardId);
    cardService.ensureCardIsNotExpired(cardResult);
    const businessResult = await businessService.ensureBusinessExists(businessId);
    businessService.ensureBusinessType(cardResult, businessResult);
    purchaseService.verifyPassword(cardResult, password);

    const cardBalance = await cardService.calculateBalance(cardId);

    cardService.ensureCardHasBalance(cardBalance, amount);
        
    const timestamp = new Date().getTime();

    const paymentData = {
        cardId: cardId,
        businessId: businessId,
        timestamp: timestamp,
        amount: amount
    } as PaymentInsertData;

    await purchaseService.insert(paymentData);

    res.sendStatus(200);
};