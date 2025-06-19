const Joi = require('joi');

const createArticleSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    'any.required': 'Title is required',
    'string.empty': 'Title is required'
  }),
  content: Joi.string().trim().required().messages({
    'any.required': 'Content is required',
    'string.empty': 'Content is required'
  }),
  image: Joi.string().uri().allow(null, '').optional().messages({
    'string.uri': 'Image must be a valid URL'
  }),
  tags: Joi.array().items(Joi.string()).optional().messages({
    'array.base': 'Tags must be an array of strings'
  })
});

const updateArticleSchema = Joi.object({
  title: Joi.string().trim().optional().messages({
    'string.empty': 'Title cannot be empty'
  }),
  content: Joi.string().trim().optional().messages({
    'string.empty': 'Content cannot be empty'
  }),
  image: Joi.string().uri().optional().messages({
    'string.uri': 'Image must be a valid URL'
  }),
  tags: Joi.array().items(Joi.string()).optional().messages({
    'array.base': 'Tags must be an array of strings'
  })
});

module.exports = {
  createArticleSchema,
  updateArticleSchema
};
