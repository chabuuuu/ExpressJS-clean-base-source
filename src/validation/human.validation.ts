import Joi from "joi";

export const createHumanValidateSchema = Joi.object().keys({
    name: Joi.string().max(10).required(),
  });
