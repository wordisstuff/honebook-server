import Joi from 'joi';

const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export default loginUserSchema;
