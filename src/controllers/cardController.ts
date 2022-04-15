import { Request, Response } from "express";

export async function createCard(req: Request, res: Response) {
    const { id } = req.body;
    res.sendStatus(200);
};