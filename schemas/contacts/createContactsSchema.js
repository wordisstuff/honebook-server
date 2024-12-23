import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  number: Joi.string().required(),
  contactType: Joi.string().valid("home", "work", "personal", "other"),
});
