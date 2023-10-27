// import { Router, Request, Response } from 'express';

// import {dbConnection} from "../db/connection";
// import {  user } from "../db/userSchema";
// import { userSchemaValidation } from '../validation/jsonSchemaValidation';
// const router = Router();

// router.post('/users', async (req: Request, res: Response) => {
//     try {
//       const userData = req.body; 

//       const{error} =userSchemaValidation.validate(userData);

//       if(error){
//         return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         error: error.details,
//         });
//       }else {
//         const [insertedUser] = await dbConnection.insert(user).values(userData).returning();
//         return res.status(201).json({
//           success: true,
//           message: 'Validation passed, user inserted',
//           user: insertedUser,
//         });
    
//       }
//       } catch (error) {
//       console.error('Error inserting user:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

//   router.get('/users', async (req: Request, res: Response) => {
//     try {
//       const users = await dbConnection.select().from(user);
//       return res.status(200).json({
//         success: true,
//         message: 'Data retrieved successfully',
//         users: users,
//       });
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  

// export default router;

import { Router, Request, Response } from 'express';
import { validateDateAgainstSchema} from '../validation/jsonSchemaValidation'; 

const validationRouter = Router();

validationRouter.post('/validate', async (req: Request, res: Response) => {
    try {
        const { schema, value } = req.body;

        if (!schema || !value) {
            return res.status(400).json({
                success: false,
                message: 'Schema and data are required in the request body',
            });
        }

        const validationResult = validateDateAgainstSchema(schema, value);

            return res.status(200).json({
                success: true,
                message: 'Data is valid according to the schema',
            });
            
        
    } catch (error) {
        console.error('Error during validation:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: (error as Error).message });
    }
});

export default validationRouter;



