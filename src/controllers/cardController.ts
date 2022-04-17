import { Request, Response } from "express";
import * as employeService from '../services/employeService.js';
import * as cardService from '../services/carrdService.js';
import { CardInsertData } from "../repositories/cardRepository.js";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

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
            res.sendStatus(404)
        }
        
        const diff = cardService.verifyExpirationDate(cardResult);
        
        if (diff < 0) {
            res.sendStatus(403)
        }
        
    } catch (error) {
        
    }
}