import { User } from '../../../DB/models/user.model.js';
import bcryptjs from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendEmail.js';
import { forgetTemp, signupTemp } from '../../utils/htmlTemplate.js';
import randomstring from 'randomstring';

// signup

export const signup = async (req, res, next) => {
  // check user
  const isUser = await User.findOne({ ...req.body.email });
  if (isUser) return next(new Error('email already exist', { cause: 404 }));
  // hash password
  const hashPassword = bcryptjs.hashSync(
    req.body.password,
    parseInt(process.env.SALT_ROUND)
  );
  //   add user
  const user = await User.create({ ...req.body, password: hashPassword });
  //  generate token
  const token = Jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, {
    expiresIn: '7d',
  });
  //   send confirmation email
  const html = signupTemp(
    `http://localhost:3000/users/activate_account/${token}`
  );
  const sentMessage = await sendEmail({
    to: user.email,
    subject: 'Acount Activation',
    html,
  });
  if (!sentMessage) return next(new Error('email is invalid!'));

  return res.json({ success: true, results: user });
};
// activation
export const activation = async (req, res, next) => {
  const { token } = req.params;
  // payload
  const payload = Jwt.verify(token, process.env.TOKEN_SECRET);
  // turn isConfimed to true
  await User.findOneAndUpdate(
    { email: payload.email },
    { isConfirmed: true },
    { new: true }
  );

  return res.json({
    success: true,
    message: 'your account have been activated!',
  });
};
// sign in
export const signin = async (req, res, next) => {
  // check user
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }],
  });
  if (!user)
    return next(new Error('email or phone number is incorect', { cause: 404 }));
  // check activation
  if (!user.isConfirmed)
    return next(new Error('you should confirm your account', { cause: 404 }));
  // check password
  const match = bcryptjs.compareSync(req.body.password, user.password);
  if (!match) return next(new Error('incorrect password'));
  // update status
  user.status = 'online';
  await user.save();
  // generate token
  const token = Jwt.sign(
    { id: user._id, email: user.email },
    process.env.TOKEN_SECRET
  );
  return res.json({ success: true, token });
};
// update account
export const update = async (req, res, next) => {
  const userId = req.payload.id;
  // check if email already exist
  const isUser = await User.findOne({
    $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }],
  });
  if (isUser) return next(new Error('this email or phone already exist'));
  // update user info
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { ...req.body },
    { new: true }
  );
  return res.json({
    success: true,
    message: 'user updated successfully',
    results: user,
  });
};

// delete account
export const deleteAccount = async (req, res, next) => {
  const userId = req.payload.id;
  const { token } = req.headers;
  // delete user
  const user = await User.findByIdAndDelete({ _id: userId });
  if (!user) return res.json({ success: false, message: 'user not found!!' });
  // make token invalid
  const addToken = await tokenBlacklist.create({ token });
  return res.json({ success: true, message: 'user deleted successfully!' });
};
// getUser
export const getUser = async (req, res, next) => {
  const userId = req.payload.id;
  // check user
  const user = await User.findById(userId);
  if (!user) return next(new Error('user not found !', { cause: 404 }));
  res.json({ success: true, results: user });
};
// get Another User data

export const getAnotherUser = async (req, res, next) => {
  const { id } = req.params;
  // check user
  const user = await User.findById(id);
  if (!user) return next(new Error('user not found !', { cause: 404 }));
  res.json({ success: true, results: user });
};

// changePassword

export const changePassword = async (req, res, next) => {
  const userId = req.payload.id;
  // check user
  const user = await User.findById(userId);
  if (!user) return next(new Error('user not found !', { cause: 404 }));
  // check password
  const match = bcryptjs.compareSync(req.body.oldPassword, user.password);
  if (!match) return next(new Error('incorrect password'));
  // hash new password
  const hashPassword = bcryptjs.hashSync(
    req.body.newPassword,
    parseInt(process.env.SALT_ROUND)
  );
  const result = await User.findByIdAndUpdate(
    { _id: userId },
    { password: hashPassword }
  );
  return res.json({
    success: true,
    message: 'password updated successfully!',
  });
};
// forget code
export const forgetCode = async (req, res, next) => {
  // check user
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new Error('user not found'));
  // check activation
  if (!user.isConfirmed) return next(new Error('activate your account first '));
  // generate forget code
  const code = randomstring.generate({
    length: 5,
    charset: 'alphabetic',
  });
  // save code to the database
  user.forgetCode = code;
  await user.save();
  // send email
  const html = forgetTemp(code);
  const sentMessage = await sendEmail({
    to: user.email,
    subject: 'Confirmation Code',
    html,
  });
  return res.json({ success: true, message: 'you have recieved a code' });
};
// reset password
export const resetPassword = async (req, res, next) => {
  // check user
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new Error('user not found'));
  // check code
  if (req.body.code !== user.forgetCode)
    return next(new Error('wrong confirmation code'));
  // hash password
  user.password = bcryptjs.hashSync(
    req.body.password,
    parseInt(process.env.SALT_ROUND)
  );
  user.forgetCode= undefined 
  await user.save();
  res.json({ success: true, message: 'password changed successfully!' });
};
// get account by recovery email
export const recoveryEmail = async (req, res, next) => {
  const users = await User.find({ recoveryEmail: req.body.recoveryEmail });
  if (users.length == 0)
    return next(new Error('there is no users assosaited with this mail'));
  return res.json({ success: true, results: users });
};
