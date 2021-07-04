const Joi = require('joi');

const { regexp: { EMAIL_REGEXP, PASSWORD_REGEXP } } = require('../constants');

module.exports = {
    createUser: Joi.object().keys({
        name: Joi.string()
            .required()
            .min(3)
            .max(35),
        age: Joi.number()
            .required()
            .min(16)
            .max(100),
        login: Joi.string()
            .required()
            .regex(EMAIL_REGEXP),
        password: Joi.string()
            .required()
            .min(5)
            .max(25)
            .regex(PASSWORD_REGEXP)
    }),

    updateUser: Joi.object().keys({
        name: Joi.string()
            .min(3)
            .max(35),
        age: Joi.number()
            .min(16)
            .max(100),
        login: Joi.string()
            .regex(EMAIL_REGEXP),
        password: Joi.string()
            .min(5)
            .max(25)
    })
};
