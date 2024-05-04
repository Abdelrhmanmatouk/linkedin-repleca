import { Router } from 'express';
import { asyncHandler } from './../../utils/asyncHandler.js';
import * as companyController from './company.controller.js';
import { isAuthenticated } from '../../middlewares/aurh.middleware.js';
import { IsHR } from '../../middlewares/isHR.js';
import { validation } from './../../middlewares/validation.middleware.js';
import {
  addCompanySchema,
  deleteschema,
  searchschema,
  updateCompanySchema,
} from './company.schema.js';


const router = Router();

// add company

router.post(
  '/addCompany',
  isAuthenticated,
  IsHR,
  validation(addCompanySchema),
  asyncHandler(companyController.addCompany)
);

// update company

router.patch(
  '/:id',
  isAuthenticated,
  IsHR,
  validation(updateCompanySchema),
  asyncHandler(companyController.updateCompany)
);

// delete company
router.delete(
  '/:id',
  isAuthenticated,
  IsHR,
  validation(deleteschema),
  asyncHandler(companyController.deleteCompany)
);


// search company

router.get('/search',isAuthenticated,validation(searchschema),asyncHandler(companyController.search))


// Get all applications for specific Jobs
router.get('/specific_job',isAuthenticated,IsHR,asyncHandler(companyController.specificJob))


// get company

router.get(
  '/:id',
  isAuthenticated,
  IsHR,
  asyncHandler(companyController.getCompany)
);



export default router;
