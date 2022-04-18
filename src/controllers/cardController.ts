import { Request, Response } from "express";
import * as employeService from '../services/employeService.js';
import * as cardService from '../services/cardService.js';
import { CardInsertData } from "../repositories/cardRepository.js";

export async function createCard(req: Request, res: Response) {
    const { employeeId, cardType } = req.body;

    const cardData = await cardService.createCardData(cardType, employeeId) as unknown as CardInsertData;
        
    const securityCode = cardData.securityCode;

    const { id: cardId } = await cardService.createNewCard(cardData);
        
    const cardResult = await cardService.findById(cardId);
        
    const card = {
        id: cardResult.id,
        number: cardResult.number,
        cardHolderName: cardResult.cardholderName,
        securityCode: securityCode,
        expirationDate: cardResult.expirationDate,
        type: cardResult.type
    }

    res.status(201).send(card);
};

export async function activateCard(req: Request, res: Response) {
    const { cardId, securityCode, password} = req.body;
    
    await cardService.updateCard(cardId, securityCode, password);

    res.sendStatus(200);
}

export async function visualizeBalance(req: Request, res: Response) {
    const { cardId } = req.body;

    const cardBalance = await cardService.calculateBalance(cardId);

    res.status(200).send(cardBalance);
}