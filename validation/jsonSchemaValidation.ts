// import Joi from 'joi';


// export const userSchemaValidation = Joi.object({
//     first_name: Joi.string().min(4).max(30).required(),
//     last_name: Joi.string().min(4).max(30).required(),
//     phNumber : Joi.string().pattern(/^[0-9]+$/, 'numbers').required(),

// });



import Ajv from 'ajv';
// import Joi from 'joi';

const ajv = new Ajv()

export const errorResponse = (schemaErrors: any) => {
    const errors = schemaErrors.map((error: any) => {
        return {
            path: error.instancePath,
            message: error.message
        }
    })
    // console.log (`Error for validating a schema with errors: ${JSON.stringify(errors)}`)
    // throw new Error( JSON.stringify(errors))

    const errorMessage = 'Error for validating a schema with errors: ' + JSON.stringify(errors);
    console.log(errorMessage);
    throw new Error(errorMessage);
}

export const validateDateAgainstSchema = (schema:any, data:any) =>{
    try {
        // const { error } = Joi.compile(schema).validate(data);
      const valid =  ajv.validate(schema, data)

      if (!valid) {
        errorResponse(ajv.errors);
        return false;
    }
    return true;
    } catch (error) {
        throw error;
    }
};