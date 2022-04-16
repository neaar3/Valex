import joi from 'joi';

const cardSchema = joi.object({
    employeId: joi.number().required(),
    cardType: joi.string().pattern(new RegExp('(^groceries$)|(^restaurants$)|(^transport$)|(^education$)|(^health$)')).required()
})

export default cardSchema;