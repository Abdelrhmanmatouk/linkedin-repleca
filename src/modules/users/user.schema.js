import joi from 'joi';

// sign up schema

export const signupSchema = joi
  .object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp('^[a-zA=Z0-9]{3,30}$'))
      .required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
    recoveryEmail: joi.string().email(),
    DOB: joi.string().pattern(/^(19[0-9]{2}|20[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/),
    mobileNumber: joi.number().required(),
    role: joi.string().valid('user', 'Company_HR').required(),
    status: joi.string().valid('online', 'offline'),
    userTechSkills: joi.array().items(joi.string()),
    userSoftSkills: joi.array().items(joi.string()),
  })
  .required();

export const activationschema = joi
  .object({
    token: joi.string().required(),
  })
  .required();

export const signinschema = joi
  .object({
    email: joi.string().email(),
    mobileNumber: joi.number(),
    password: joi
      .string()
      .pattern(new RegExp('^[a-zA=Z0-9]{3,30}$'))
      .required(),
  })
  .required();

export const updateschema = joi
  .object({
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.string().email(),
    recoveryEmail: joi.string().email(),
    mobileNumber: joi.number(),
    DOB: joi.string().pattern(/^(19[0-9]{2}|20[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/),
  })
  .required();

export const changePasswordschema = joi
  .object({
    oldPassword: joi
      .string()
      .pattern(new RegExp('^[a-zA=Z0-9]{3,30}$'))
      .required(),
    newPassword: joi
      .string()
      .pattern(new RegExp('^[a-zA=Z0-9]{3,30}$'))
      .required(),
    confirmPassword: joi.string().valid(joi.ref('newPassword')).required(),
  })
  .required();

export const emailschema = joi
  .object({
    email: joi.string().email().required(),
  })
  .required();

export const resetPasswordSchema = joi
  .object({
    email: joi.string().email().required(),
    code: joi.string().length(5).required(),
    password: joi
      .string()
      .pattern(new RegExp('^[a-zA=Z0-9]{3,30}$'))
      .required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
  })
  .required();

  export const recoveryEmailschema = joi.object({
    recoveryEmail: joi.string().email(),
  }).required()
