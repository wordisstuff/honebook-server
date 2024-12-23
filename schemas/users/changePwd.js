import Joi from 'joi';

const changePwd = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
});

export default changePwd;
