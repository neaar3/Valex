import { NextFunction, Request, Response } from "express";
import joi from 'joi';

export default function validateSchemaMiddleware(schema: joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.validate(req.body);
        if (validation.error) {
            console.log(validation.error)
            return res.status(422).send("Schema inválido!")
        }

        next();
    }
}