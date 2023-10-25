import Joi from 'joi';


export const userSchemaValidation = Joi.object({
    first_name: Joi.string().min(4).max(30).required(),
    last_name: Joi.string().min(4).max(30).required(),
    phNumber : Joi.string().pattern(/^[0-9]+$/, 'numbers').required(),

});