import joi from 'joi';
import { objectIDValidation } from '../../middlewares/validation.middleware.js';

export const addCompanySchema = joi.object({
    companyName:joi.string().required(),
    description:joi.string().required(),
    industry:joi.string().required(),
    address:joi.string().required(),
    numberOfEmployees:joi.string().min(1).max(1000),
    companyEmail:joi.string().email().required(),
    companyHR:joi.custom(objectIDValidation),
   
}).required()

export const updateCompanySchema = joi.object({
    companyName:joi.string(),
    description:joi.string(),
    industry:joi.string(),
    address:joi.string(),
    numberOfEmployees:joi.string().min(1).max(1000),
    companyEmail:joi.string().email(),
    companyHR:joi.custom(objectIDValidation),
    
    id:joi.custom(objectIDValidation).required(),
}).required()

export const deleteschema = joi.object({
    companyHR:joi.custom(objectIDValidation),
   
    id:joi.custom(objectIDValidation).required(),
}).required()

export const searchschema= joi.object({
    key:joi.string().required()
}).required()