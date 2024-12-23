import Joi from "joi";

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(16),
  number: Joi.string(),
});
