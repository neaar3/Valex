import { Request, Response } from "express";
import * as employeService from '../services/employeService.js';
import * as cardService from '../services/carrdService.js';
import { CardInsertData } from "../repositories/cardRepository.js";

export async function createCard(req: Request, res: Response) {
    const { employeId, cardType } = req.body;


    try {
        const employeExist = await employeService.verifyEmploye(employeId);

        if (!employeExist) {
            return res.sendStatus(404)
        }

        const employeHasCard = await cardService.findByTypeAndEmployeeId(cardType, employeId);

        if (employeHasCard !== undefined) {
            return res.sendStatus(409)
        }

        const cardData = cardService.createCardData(cardType, employeId, employeExist.fullName) as unknown as CardInsertData;

        // console.log(cardData)
        await cardService.createNewCard(cardData);
    } catch (error) {
        
    }

    res.sendStatus(200);
};