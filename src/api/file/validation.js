import { Joi } from "express-validation";

const signUp = {
  body: Joi.object({
    phone: Joi.string().trim().required().min(10),
    password: Joi.string().required().min(6),
    sex: Joi.number().integer().valid(0, 1, null),
  }).unknown(),
};

const login = {
  body: Joi.object({
    phone: Joi.string().trim().required(),
    password: Joi.string().required(),
  }),
};

export default {
  signUp,
  login,
};
