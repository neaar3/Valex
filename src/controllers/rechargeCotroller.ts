import { Request, Response } from "express";
import * as rechargeService from '../services/rechargeService.js';
import * as cardService from '../services/cardService.js';
import { RechargeInsertData } from "../repositories/rechargeRepository.js";

export async function rechargeCard(req: Request, res: Response) {
    const { cardId, amount } = req.body;

    const cardResult = await cardService.ensureCardExists(cardId);
    cardService.ensureCardIsNotExpired(cardResult);

    const timestamp = new Date().getTime();

    const rechargeData = {
        cardId: cardId,
        timestamp: timestamp,
        amount: amount
    } as RechargeInsertData;

    await rechargeService.insert(rechargeData);

    res.sendStatus(201);
};