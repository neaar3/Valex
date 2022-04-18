import { Request, Response } from "express";
import * as rechargeService from '../services/rechargeService.js';
import * as cardService from '../services/carrdService.js';
import { RechargeInsertData } from "../repositories/rechargeRepository.js";

export async function rechargeCard(req: Request, res: Response) {
    const { cardId, amount } = req.body;

    try {
        const cardResult = await cardService.findById(cardId);
        if (!cardResult) {
            console.log(cardResult)
            res.sendStatus(404)
        }

        const diff = cardService.verifyExpirationDate(cardResult);
        if (diff < 0) {
            res.sendStatus(403)
        }

        const timestamp = new Date().getTime();

        const rechargeData = {
            cardId: cardId,
            timestamp: timestamp,
            amount: amount
        } as RechargeInsertData;

        await rechargeService.insert(rechargeData);

        res.sendStatus(201);
    } catch (error) {
        console.log(error)
    }
};