import joi from 'joi';
import { objectIDValidation } from '../../middlewares/validation.middleware.js';

export const addJobSchema = joi.object({
    jobTitle:joi.string().required(),
    jobLocation:joi.string().valid('onsite', 'remotely', 'hybrid').required(),
    workingTime:joi.string().valid('part-time', 'full-time').required(),
    seniorityLevel:joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    jobDescription:joi.string().required(),
    technicalSkills:joi.array().items(joi.string()),
    softSkills:joi.array().items(joi.string()),

}).required()

export const updateJobSchema = joi.object({
    jobTitle:joi.string(),
    jobLocation:joi.string().valid('onsite', 'remotely', 'hybrid'),
    workingTime:joi.string().valid('part-time', 'full-time'),
    seniorityLevel:joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    jobDescription:joi.string(),
    technicalSkills:joi.array().items(joi.string()),
    softSkills:joi.array().items(joi.string()),
    id:joi.custom(objectIDValidation).required(),
}).required()

export const deleteJobSchema = joi.object({
    id:joi.custom(objectIDValidation).required(),
}).required()

export const getJobSchema = joi.object({
    id:joi.custom(objectIDValidation).required(),
}).required()
 export const filterSchema = joi.object({
    workingTime:joi.string().valid('part-time', 'full-time'),
    jobLocation:joi.string().valid('onsite', 'remotely', 'hybrid'),
    seniorityLevel:joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    jobTitle:joi.string(),
    technicalSkills:joi.string(),


 }).required()

 export const applySchema = joi.object({
    jobId:joi.custom(objectIDValidation).required(),
 }).required()