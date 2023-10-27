"use strict";
// import { Router, Request, Response } from 'express';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = require("express");
const jsonSchemaValidation_1 = require("../validation/jsonSchemaValidation");
const validationRouter = (0, express_1.Router)();
// Define a route to validate data against a dynamic schema
validationRouter.post('/validate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the schema and data from the request body
        const { schema, value } = req.body;
        if (!schema || !value) {
            return res.status(400).json({
                success: false,
                message: 'Schema and data are required in the request body',
            });
        }
        // Call the validation service to validate the data against the schema
        const validationResult = (0, jsonSchemaValidation_1.validateDateAgainstSchema)(schema, value);
        return res.status(200).json({
            success: true,
            message: 'Data is valid according to the schema',
        });
    }
    catch (error) {
        console.error('Error during validation:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
}));
exports.default = validationRouter;
