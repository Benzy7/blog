const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().required().messages({
        'any.required': 'Username is required',
        'string.empty': 'Username is required'
    }),
    firstName: Joi.string().required().messages({
        'any.required': 'First name is required',
        'string.empty': 'First name is required'
    }),
    lastName: Joi.string().required().messages({
        'any.required': 'Last name is required',
        'string.empty': 'Last name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Valid email is required',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required'
    }),
    dateOfBirth: Joi.date().iso().allow(null, '').optional().messages({
        'date.format': 'Date of birth must be a valid ISO date'
    })
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Valid email is required',
        'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
        'string.empty': 'Password is required'
    })
});

const refreshSchema = Joi.object({
    refreshToken: Joi.string().required().messages({
        'any.required': 'Refresh token is required',
        'string.empty': 'Refresh token cannot be empty'
    })
});

const updateUserRoleSchema = Joi.object({
    role: Joi.string().valid('reader', 'admin', 'editor', 'author').required().messages({
        'any.required': 'Role is required',
        'any.only': 'Role must be one of reader, author, admin, editor'
    })
});

module.exports = {
    registerSchema,
    loginSchema,
    refreshSchema,
    updateUserRoleSchema
};
