import joi from 'joi';

const purchaseSchema = joi.object({
    cardId: joi.number().required(),
    password: joi.string().pattern(new RegExp('^[0-9]{4,4}$')).required(),
    businessId: joi.number().required(),
    amount: joi.number().greater(0).required()
});

export default purchaseSchema;