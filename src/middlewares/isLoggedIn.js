import { User } from '../../DB/models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const IsloggedIn = asyncHandler(async (req, res, next) => {
  const userId = req.payload.id
  // check user
  const user = await User.findById(userId);
  if (!user) return next(new Error('user not found!'));
  // check if user logged in
  if (user.status == 'offline')
    return next(new Error('you must be logged in!'));
  return next();
});
