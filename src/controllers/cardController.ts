import { Request, Response } from "express";
import * as employeService from '../services/employeService.js'

export async function createCard(req: Request, res: Response) {
    const { employeId, cardType } = req.body;

    try {
        const employeExist = await employeService.verifyEmploye(employeId);

        if (!employeExist) {
            return res.sendStatus(404)
        }
    } catch (error) {
        
    }

    res.sendStatus(200);
};