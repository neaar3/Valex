import { Request, Response } from "express";
import * as employeService from '../services/employeService.js';
import * as cardService from '../services/carrdService.js';
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
    
    try {
        const cardResult = await cardService.findById(cardId);
        if (!cardResult) {
            return res.sendStatus(404);
            
        }
        if (cardResult.password) {
            return res.sendStatus(403)
        }
        
        const diff = cardService.verifyExpirationDate(cardResult);
        if (diff < 0) {
            return res.sendStatus(403)
        }

        const securityCodeIsValid = cardService.verifySecurityCode(cardResult, securityCode);
        if (!securityCodeIsValid) {
            return res.sendStatus(401)
        }

        await cardService.updateCard(cardId, password);

        res.sendStatus(200);
    } catch (error) {
    }
}

export async function visualizeBalance(req: Request, res: Response) {
    const { cardId } = req.body;

    try {
        const cardResult = await cardService.findById(cardId);
        if (!cardResult) {
            return res.sendStatus(404)
        }       

        const cardBalance = await cardService.calculateBalance(cardId);

        res.status(200).send(cardBalance);
    } catch (error) {
        
    }
}