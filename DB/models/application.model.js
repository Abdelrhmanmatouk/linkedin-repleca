import mongoose, { Schema } from 'mongoose';

// application schema

const applicationSchema = new Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    addedBy: { type: mongoose.Schema.Types.ObjectId },
    userTechSkills: [String],
    userSoftSkills: [String],
    userResume: { secure_url: String, public_id: String },
  },
  { timestamps: true }
);

// application model

export const Application = mongoose.model('Application', applicationSchema);
