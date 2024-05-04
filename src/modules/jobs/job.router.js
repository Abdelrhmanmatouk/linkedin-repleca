import { Router } from 'express';
import { asyncHandler } from './../../utils/asyncHandler.js';
import { isAuthenticated } from '../../middlewares/aurh.middleware.js';
import { validation } from '../../middlewares/validation.middleware.js';
import { IsHR } from '../../middlewares/isHR.js';
import * as jobController from './job.controller.js';
import { addJobSchema, applySchema, deleteJobSchema, filterSchema, getJobSchema, updateJobSchema } from './job.schema.js';
import { IsloggedIn } from "../../middlewares/isLoggedIn.js";
import {isUser} from './../../middlewares/isUser.js'
import { uploadfile } from '../../utils/multer.js';

const router = Router();

// add job

router.post(
  '/addjob',
  isAuthenticated,
  IsHR,
  validation(addJobSchema),
  asyncHandler(jobController.addjob)
);

// update job

router.patch(
  '/:id',
  isAuthenticated,
  IsHR,
  validation(updateJobSchema),
  asyncHandler(jobController.updatejob)
);

// delete job

router.delete('/:id',isAuthenticated,IsHR,validation(deleteJobSchema),asyncHandler(jobController.deletejob))

// get job with company

router.get('/alljob',isAuthenticated,IsloggedIn,asyncHandler(jobController.getjob))


// filtered jobs

router.get('/filtered',isAuthenticated,IsloggedIn,validation(filterSchema),asyncHandler(jobController.getfilteredjobs))

// get all jobs for a specific company

router.get('/:id',isAuthenticated,IsloggedIn,validation(getJobSchema),asyncHandler(jobController.getJobsForCompany))


// apply to job

router.post('/apply/:jobId',isAuthenticated,uploadfile().single('userResume'),isUser,validation(applySchema),asyncHandler(jobController.apply) )


export default router;
