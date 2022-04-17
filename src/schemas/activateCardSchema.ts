import joi from 'joi';

const activateCardSchema = joi.object({
    cardId: joi.number().required(),
    cvc: joi.string().pattern(new RegExp('^[0-9]{3,3}$')).required(),
    password: joi.string().pattern(new RegExp('^[0-9]{4,4}$')).required(),
});

export default activateCardSchema;