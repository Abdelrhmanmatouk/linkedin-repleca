import mongoose, { Schema } from 'mongoose';

// create job schema

const jobSchema = new Schema(
  {
    jobTitle: {
      type: String,
      require: true,
    },
    jobLocation: {
      type: String,
      require: true,
      enum: ['onsite', 'remotely', 'hybrid'],
    },
    workingTime: {
      type: String,
      require: true,
      enum: ['part-time', 'full-time'],
    },
    seniorityLevel: {
      type: String,
      require: true,
      enum: ['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'],
    },
    jobDescription: {
      type: String,
      require: true,
    },
    technicalSkills: [String],
    softSkills: [String],
    addedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'}
  },
  { timestamps: true }
);

// Job model

export const Job = mongoose.model('Job',jobSchema)