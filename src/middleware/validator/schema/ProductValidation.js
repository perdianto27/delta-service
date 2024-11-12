const Joi = require('joi');

const postProductValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().required()
});

const putProductValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().required()
});

const validateId = Joi.object().keys({
  id: Joi.string().required()
});

module.exports = {
  postProductValidation,
  putProductValidation,
  validateId
}