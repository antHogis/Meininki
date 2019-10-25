const Joi = require('@hapi/joi');

const nameValidation = Joi.string()
  .pattern(/^[a-z0-9_-]{6,16}$/i, {
    name: 'Must be 6-16 characters, can only contain letters, numbers, underscores and hyphens'
  });

const emailValidation = Joi.string()
  .email();

const passwordValidation = Joi.string()
  .min(8)
  .max(64);

async function validateRegister(registrationData) {
  const userSchema = Joi.object({
    name: nameValidation,
    email: emailValidation,
    password: passwordValidation
  });
  
  return await userSchema.validateAsync(registrationData, { abortEarly: false });
}

module.exports = {
  validateRegister
}