import joi from 'joi';

const cardSchema = joi.object({
    employeId: joi.number().required(),
    cardType: joi.string().required()
})

export default cardSchema;