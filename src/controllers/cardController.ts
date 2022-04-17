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
        
        const cvc = cardData.securityCode;

        const { id: cardId } = await cardService.createNewCard(cardData);
        
        const cardResult = await cardService.findById(cardId);
        
        const card = {
            id: cardResult.id,
            number: cardResult.number,
            cardHolderName: cardResult.cardholderName,
            securityCode: cvc,
            expirationDate: cardResult.expirationDate,
            type: cardResult.type
        }

        res.status(201).send(card);
    } catch (error) {
        console.log(error)
    }
};