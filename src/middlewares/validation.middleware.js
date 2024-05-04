import { Types } from "mongoose";

export const objectIDValidation = (value,helper)=>{
  if(Types.ObjectId.isValid(value)) return true
  return helper.message("invalid ID!!!")
}

export const validation = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.query, ...req.params };
    // 2-validate
    const validationResult = schema.validate(data, {
      abortEarly: false,
    });

    if (validationResult.error) {
      const errorMessage = validationResult.error.details.map((obj) => {
        return obj.message;
      });
      return next(new Error(errorMessage));
    }
   return next()
  };
};
