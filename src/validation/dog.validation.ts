import Joi from 'joi';

export const createNewDogValidateSchema = Joi.object().keys({
  name: Joi.string().max(10).required(),
  breed: Joi.string().max(10).required()
});
