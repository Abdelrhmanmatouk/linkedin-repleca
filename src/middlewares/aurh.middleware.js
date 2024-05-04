import Jwt from 'jsonwebtoken';
import { User } from '../../DB/models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { tokenBlacklist } from '../../DB/models/tokenblacklist.js';

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  // check token existed
  let { token } = req.headers;
  if (!token) return next(new Error('Token is missing !'));
  // check if it's a deleted account
  const istoken = await tokenBlacklist.findOne({ token });
  if (istoken) {
    return next(new Error('this user have been deleted'));
  }
  // check if token is valid
  if (!token.startsWith(process.env.BEARER_KEY))
    return next(new Error('Token is Invalid!!'));

  token = token.split(process.env.BEARER_KEY)[1];

  // generate payload
  const payload = Jwt.verify(token, process.env.TOKEN_SECRET);
  // getting user information
  const isUser = await User.findById(payload.id);
  if (!isUser) return next(new Error('user not found'));
  // pass user to next middleware
  req.payload = payload;
  return next();
});
