const Joi = require('joi');

const createCommentSchema = Joi.object({
    content: Joi.string().trim().required().messages({ 'any.required': 'Content is required' }),
    parent: Joi.string().optional().allow(null)
});

module.exports = { createCommentSchema };