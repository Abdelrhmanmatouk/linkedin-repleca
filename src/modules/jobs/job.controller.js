import { Application } from '../../../DB/models/application.model.js';
import { Company } from '../../../DB/models/company.model.js';
import { Job } from '../../../DB/models/job.model.js';
import { User } from '../../../DB/models/user.model.js';
import cloudinary from './../../utils/cloud.js';

// add job

export const addjob = async (req, res, next) => {
  const HrId = req.payload.id;

  // get company
  const company = await Company.findOne({ companyHR: HrId });
  if (!company) return next(new Error('there is no company', { cause: 404 }));
  // add data
  const job = await Job.create({ ...req.body, addedBy: company._id });
  return res.json({ success: true, results: job });
};

// update job

export const updatejob = async (req, res, next) => {
  const HrId = req.payload.id;
  const { id } = req.params;
  // check company
  const company = await Company.findOne({ companyHR: HrId });
  if (!company) return next(new Error('there is no company', { cause: 404 }));

  //   check job
  const isjob = await Job.findById(id);
  if (!isjob) return next(new Error('there is no job', { cause: 404 }));

  //   check if this HR is working in the same company that own's the job
  if (company._id.toString() != isjob.addedBy.toString())
    return next(
      new Error('you are not working in this company', { cause: 404 })
    );

  //   update job
  const job = await Job.findByIdAndUpdate({ _id: id }, req.body, { new: true });

  res.json({
    success: true,
    message: 'job updated successfully!',
    result: job,
  });
};

// delete job

export const deletejob = async (req, res, next) => {
  const HrId = req.payload.id;
  const { id } = req.params;
  // check company
  const company = await Company.findOne({ companyHR: HrId });
  if (!company) return next(new Error('there is no company', { cause: 404 }));
  //   check job
  const isjob = await Job.findById(id);
  if (!isjob) return next(new Error('there is no job', { cause: 404 }));

  //   check if this HR is working in the same company that own's the job
  if (company._id.toString() != isjob.addedBy.toString())
    return next(
      new Error('you are not working in this company', { cause: 404 })
    );

  const job = await Job.findByIdAndDelete(id);

  res.json({
    success: true,
    message: 'job deleted successfully!',
  });
};

// get job with company data

export const getjob = async (req, res, next) => {
  const result = await Job.find().populate('addedBy');
  if (result.length == 0)
    return next(new Error('there is no jobs', { cause: 404 }));
  res.json({
    success: true,
    Jobs: result.length,
    results: result,
  });
};

// get all jobs for a specific company

export const getJobsForCompany = async (req, res, next) => {
  const { id } = req.params;
  // check company
  const company = await Company.findById(id);
  if (!company) return next(new Error('there is no company', { cause: 404 }));
  // get jobs for this company
  const result = await Job.find({ addedBy: id });
  if (result.length == 0)
    return next(new Error('there is no jobs', { cause: 404 }));
  res.json({
    success: true,
    Jobs: result.length,
    results: result,
  });
};
// filtered jobs
export const getfilteredjobs = async (req, res, next) => {
  const result = await Job.find(req.query);
  if (result.length == 0)
    return next(new Error('there is no jobs', { cause: 404 }));
  res.json({
    success: true,
    Jobs: result.length,
    results: result,
  });
};

// apply for a job
export const apply = async (req, res, next) => {
  const userId = req.payload.id;
  const {jobId} = req.params;
 
  // find user
  const user = await User.findById(userId);
  // find company own this job
  const job = await Job.findById(jobId)

  if(!job)return  next(new Error('there is no jobs', { cause: 404 }));
  
  // uplaod resume on the cloudinary

  const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path);

  const app = await Application.create({
    jobId,
    userId,
    addedBy:job.addedBy,
    userTechSkills: user.userTechSkills,
    userSoftSkills: user.userSoftSkills,
    userResume: {secure_url,public_id},
  });
  res.json({success:true,app,message:"you applied successfully!"})
};
