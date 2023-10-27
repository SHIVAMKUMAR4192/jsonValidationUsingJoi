"use strict";
// import Joi from 'joi';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDateAgainstSchema = exports.errorResponse = void 0;
// export const userSchemaValidation = Joi.object({
//     first_name: Joi.string().min(4).max(30).required(),
//     last_name: Joi.string().min(4).max(30).required(),
//     phNumber : Joi.string().pattern(/^[0-9]+$/, 'numbers').required(),
// });
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
const errorResponse = (schemaErrors) => {
    const errors = schemaErrors.map((error) => {
        return {
            path: error.instancePath,
            message: error.message
        };
    });
    console.log(`Error for validating a schema with errors: ${JSON.stringify(errors)}`);
    throw new Error(JSON.stringify(errors));
};
exports.errorResponse = errorResponse;
const validateDateAgainstSchema = (schema, data) => {
    try {
        // const { error } = Joi.compile(schema).validate(data);
        const valid = ajv.validate(schema, data);
        if (!valid) {
            (0, exports.errorResponse)(ajv.errors);
        }
        // if (!valid) {
        //     return {
        //         success: true,
        //     };
        // } else {
        //     return {
        //         success: false,
        //         error: valid.details,
        //     };
        // }
    }
    catch (error) {
        throw error;
    }
};
exports.validateDateAgainstSchema = validateDateAgainstSchema;
