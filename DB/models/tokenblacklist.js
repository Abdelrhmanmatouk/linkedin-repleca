import mongoose, { Schema } from 'mongoose';

const BlacklistSchema = new Schema(
  {
    token: { type: String, require: true },
  },
  {
    timestamps: true,
  },
);

export let tokenBlacklist = mongoose.model('blacklist', BlacklistSchema);
