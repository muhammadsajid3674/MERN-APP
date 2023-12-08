import Joi from 'joi';
export const Login = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).max(128),
    }),
};

export const Register = {
    body: Joi.object({
        name: Joi.string().required().min(2).max(30),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).max(128),
    })
};