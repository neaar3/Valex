import { NextFunction, Request, Response } from "express";
import * as authService from '../services/authService.js'

export default async function ensureAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
        return res.sendStatus(401)
    }

    try {
        const keyExist = await authService.verifyApiKey(apiKey);

        if (keyExist === undefined) {
            return res.sendStatus(401)
        }
    } catch (error) {
        console.log(error)
    }

    next();
}