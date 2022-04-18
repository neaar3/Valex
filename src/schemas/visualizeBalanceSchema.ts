import joi from 'joi';

const visualizeBalanceSchema = joi.object({
    cardId: joi.number().required(),
});

export default visualizeBalanceSchema;