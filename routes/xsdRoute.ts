import { Router, Request, Response } from 'express';
import { validateXMLAgainstXSD } from '../validation/xsdSchemaValidation'; 

const xmlValidationRouter = Router();

xmlValidationRouter.post('/validate-xml', async (req: Request, res: Response) => {
  try {
    const { xsdSchema, xmlData } = req.body;

    if (!xsdSchema || !xmlData) {
      return res.status(400).json({
        success: false,
        message: 'XSD schema and XML data are required in the request body',
      });
    }

    const validationResult = validateXMLAgainstXSD(xsdSchema, xmlData);
    if (validationResult) {
      return res.status(200).json({
        success: true,
        message: 'XML data is valid according to the XSD schema',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'XML data validation failed against the XSD schema',
      });
    }
  } catch (error) {
    console.error('Error during XSD validation:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default xmlValidationRouter;
