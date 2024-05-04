import joi from 'joi';

export const bonusSchema = joi.object({
    createdAt:joi.date().required()
}).required()

