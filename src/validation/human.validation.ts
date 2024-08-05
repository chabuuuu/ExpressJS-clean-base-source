import { RolesEnum } from '@/enums/Roles.enum';
import Joi, { valid } from 'joi';

export const createHumanValidateSchema = Joi.object().keys({
  name: Joi.string().max(70).required(),
  username: Joi.string().max(50).required(),
  password: Joi.string().max(70).required(),
  role: Joi.string()
    .valid(...Object.values(RolesEnum))
    .required()
});

export const loginHumanValidateSchema = Joi.object().keys({
  username: Joi.string().max(50).required(),
  password: Joi.string().max(70).required()
});
