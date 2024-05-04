import { Application } from '../../../DB/models/application.model.js';
import { Company } from '../../../DB/models/company.model.js';

// add company

export const addCompany = async (req, res, next) => {
  // get HR id
  const HRid = req.payload.id;
  // check if company already exist
  const isCompany = await Company.find({
    $or: [
      { companyEmail: req.body.companyEmail },
      { companyName: req.body.companyName },
    ],
  });
  if (isCompany.length > 0)
    return next(new Error('this email or company name already exist'));
  //   add company
  const company = await Company.create({
    ...req.body,
    companyHR: HRid,
    companyowner: HRid,
  });
  return res.json({ success: true, results: company });
};

// update company

export const updateCompany = async (req, res, next) => {
  const { id } = req.params;
  // get HR id
  const HRid = req.payload.id;
  const filter = { _id: id, companyHR: HRid };
  //   check company
  const isCompany = await Company.findById(id);
  if (!isCompany) return next(new Error('inavlid id'));
  // check company owner
  if (isCompany.companyowner != HRid)
    return next(new Error('you are not the company owner'));
  // update company
  const company = await Company.findOneAndUpdate(filter, req.body, {
    new: true,
  });
  if (!company) return next(new Error('you are not the owner'));
  return res.json({
    success: true,
    message: 'company updated successfully!',
    results: company,
  });
};

// delete company

export const deleteCompany = async (req, res, next) => {
  const { id } = req.params;
  const HRid = req.payload.id;
  const filter = { _id: id, companyHR: HRid };
  //   check company
  const isCompany = await Company.findById(id);
  if (!isCompany) return next(new Error('inavlid id'));
  // check company owner
  if (isCompany.companyowner != HRid)
    return next(new Error('you are not the company owner'));
  const company = await Company.findOneAndDelete(filter);
  if (!company) return next(new Error('you are not the owner'));
  return res.json({ success: true, message: 'company deleted successfully!' });
};

// get company data

export const getCompany = async (req, res, next) => {
  const { id } = req.params;
  const HRid = req.payload.id;
  const filter = { _id: id, companyHR: HRid };
  const company = await Company.findOne(filter);
  if (!company) return next(new Error('inavlid id'));
  return res.json({ success: true, results: company });
};

// search company

export const search = async (req, res, next) => {
  const result = await Company.find({
    companyName: { $regex: req.query.key },
  });
  if (result.length == 0)
    return next(new Error('there is no company with this name'));
  res.json({ success: true, results: result });
};

// Get all applications for specific Jobs
export const specificJob = async (req, res, next) => {
  const HRid = req.payload.id;
  //   check company and the owner
  const company = await Company.find({ companyowner: HRid });
  if (company.length == 0)
    return next(new Error('you are not the owner there is no company'));
  // getiing the applications
  const result = await Application.find({ addedBy: company._id }).populate(
    'userId'
  );
  if (result.length == 0)
    return next(new Error('there is no applications', { cause: 404 }));
  res.json({
    success: true,
    results: result,
  });
};
