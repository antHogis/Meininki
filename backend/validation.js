const Joi = require('@hapi/joi');

async function validateRegister(registrationData) {
  const userSchema = Joi.object({
    name: Joi.string()
      .pattern(/^[a-z0-9_-]{6,16}$/i, {
        name: 'Must be 6-16 characters, can only contain letters, numbers, underscores and hyphens'
      }),
    email: Joi.string()
      .email(),
    password: Joi.string()
      .min(8)
      .max(64)
  });
  
  return await userSchema.validateAsync(registrationData, { abortEarly: false });
}



module.exports = {
  validateRegister
}