const Joi = require('@hapi/joi');

const nameValidation = Joi.string()
  .pattern(/^[a-z0-9_-]{6,16}$/i, {
    name: 'Must be 6-16 characters, can only contain letters, numbers, underscores and hyphens'
  })
  .required();

const emailValidation = Joi.string()
  .email()
  .required();

const passwordValidation = Joi.string()
  .min(8)
  .max(64)
  .required();

async function validateRegister(registrationData) {
  const userSchema = Joi.object({
    name: nameValidation,
    email: emailValidation,
    password: passwordValidation
  });
  
  return await userSchema.validateAsync(registrationData, { abortEarly: false });
}

async function validateLogin(loginData) {
  const loginSchema = Joi.object({
    email: emailValidation,
    password: passwordValidation
  });

  return await loginSchema.validateAsync(loginData, { abortEarly: false });
}

async function validateEventQueryParams(queryData) {
  const querySchema = Joi.object({
    ownerId: Joi.string()
  })

  return await querySchema.validateAsync(queryData, { abortEarly: false });
}

module.exports = {
  validateRegister,
  validateLogin,
  validateEventQueryParams
}