import joi from 'joi';

const createCardSchema = joi.object({
    employeeId: joi.number().required(),
    cardType: joi.string().pattern(new RegExp('(^groceries$)|(^restaurants$)|(^transport$)|(^education$)|(^health$)')).required()
})

export default createCardSchema;