import { Application } from '../../../DB/models/application.model.js';
import { Company } from '../../../DB/models/company.model.js';
import xl from 'excel4node';
import json2csv, { Parser } from 'json2csv';
import fs from 'fs';

export const bonus = async (req, res, next) => {
  const HRid = req.payload.id;

  //   check company
  const isCompany = await Company.findOne({ companyowner: HRid });

  if (!isCompany) return next(new Error('you are not the owner'));

  // getiing the applications
  const result = await Application.find({ addedBy: isCompany._id });

  if (result.length == 0)
    return next(new Error('there is no applications', { cause: 404 }));
  
  const fields = ['userResume.secure_url', 'jobId', 'userId', 'userTechSkills'];
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse((result ));

  const filename = `result.xlsx`;
  const path = `./${filename}`;
  fs.writeFileSync(path, csv, (err) => {
    if (err) throw err;
    console.log(`File ${filename} has been saved.`);
  });
  //  res.download(path, (err) => {
  //   if (err) throw err;
  //   fs.unlinkSync(path);
  // });

  return res.json({
    success: true,
    length: result.length,
    results: result,
  });
};
