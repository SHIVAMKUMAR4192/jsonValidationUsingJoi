import xsd from 'libxmljs2-xsd'



// export const validateXSDschemaDefinition =(schema:any) =>{
//     try{
//         const valid = xsd.parse(schema)
//         if(valid){
//             return true
//         }
//     } catch(error:any){
//         throw error;
//     }
//     return false;
// }

export const errorResponseForXSD = (schemaErrors: any) => {
    const errors = schemaErrors.map((error: any) => {
        return {
            message: error.message
        }
    })
    console.log (`Error for validating a schema with errors: ${JSON.stringify(errors)}`)
    throw new Error( JSON.stringify(errors))
}

export const validateXMLAgainstXSD = (xsdSchema: any,xmlData: any) =>{
try{
    const parsedSchema =xsd.parse(xsdSchema);
    const errors = parsedSchema.validate(xmlData);

    if(errors){
        errorResponseForXSD(errors)
    }
    return true;
}catch(error:any){
    throw error;
}

};


//     try{
//         const xsdValidator = new validator();
//         xsdValidator.load(xsdSchema);
//         // const xsdValidator = xsd.parse(xsdSchema);
//         const valid= xsdValidator.validate(xmlData);
    
//     if(!valid){
//         errorResponseForXSD(xsdValidator.errors);
//     }
//     return true;
// }catch(error:any){
//     throw error;
// }