import Joi from 'joi';

const signupUsersSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export default signupUsersSchema;
