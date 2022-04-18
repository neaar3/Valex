import { Request, Response } from "express";
import * as employeService from '../services/employeService.js';
import * as cardService from '../services/carrdService.js';
import { CardInsertData } from "../repositories/cardRepository.js";

export async function createCard(req: Request, res: Response) {
    const { employeeId, cardType } = req.body;

    try {
        const employeeExist = await employeService.verifyEmploye(employeeId);
        if (!employeeExist) {
            return res.sendStatus(404)
        }

        const employeHasCard = await cardService.findByTypeAndEmployeeId(cardType, employeeId);
        if (employeHasCard !== undefined) {
            return res.sendStatus(409)
        }

        const cardData = cardService.createCardData(cardType, employeeId, employeeExist.fullName) as unknown as CardInsertData;
        
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
    } catch (error) {
        console.log(error)
    }
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
        console.log(error)
    }
}

export async function visualizeBalance(req: Request, res: Response) {
    const { cardId } = req.body;

    try {
        const cardResult = await cardService.findById(cardId);
        if (!cardResult) {
            return res.sendStatus(404)
        }       

        const cardRecharges = await cardService.getRecharges(cardId);

        const cardTransactions = await cardService.getTransactions(cardId);

        const cardBalance = cardService.calculateBalance(cardRecharges, cardTransactions);

        res.status(200).send(cardBalance);
    } catch (error) {
        
    }
}