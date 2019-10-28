const Joi = require('@hapi/joi');
const { ErrorEntry } = require('./errors/ErrorResponse');

const nameValidation = Joi.string()
  .pattern(/^[a-z0-9_-]{6,16}$/i, {
    name: 'Must be 6-16 characters, can only contain letters, numbers, underscores and hyphens'
  });

const emailValidation = Joi.string()
  .email();
  

const passwordValidation = Joi.string()
  .min(8)
  .max(64)

async function validateRegister(registrationData) {
  const userSchema = Joi.object({
    name: nameValidation.required(),
    email: emailValidation.required(),
    password: passwordValidation.required()
  });
  
  return await userSchema.validateAsync(registrationData, { abortEarly: false });
}

async function validateLogin(loginData) {
  const loginSchema = Joi.object({
    email: emailValidation.required(),
    password: passwordValidation.required()
  });

  return await loginSchema.validateAsync(loginData, { abortEarly: false });
}

async function validateUserUpdate(userData, oldUserData) {
  const userSchema = Joi.object({
    email: emailValidation,
    oldEmail: emailValidation.valid(oldUserData.email),
    name: nameValidation,
    oldName: nameValidation.valid(oldUserData.name),
    password: passwordValidation,
    oldPassword: passwordValidation
  })
    .with('email', 'oldEmail')
    .with('name', 'oldName')
    .with('password', 'oldPassword');
  
  return await userSchema.validateAsync(userData, { abortEarly: false });
}

async function validateEventQueryParams(queryData) {
  const querySchema = Joi.object({
    owner: Joi.string()
  })

  return await querySchema.validateAsync(queryData, { abortEarly: false });
}

async function validateEvent(data, requiredFields = false) {
  let requireFields = {
    required: schema => schema.required()
  };

  let eventSchema = Joi.object({
    title: Joi.string().min(1).alter(requireFields),
    description: Joi.string().min(1).alter(requireFields),
    tags: Joi.array().items(Joi.string()),
    timeStart: Joi.date().iso().greater('now').alter(requireFields),
    timeEnd: Joi.date().iso().greater(data.timeStart).alter(requireFields),
    imageUrl: Joi.string().uri(),
    ticket: Joi.object({
      price: Joi.number().min(0).alter(requireFields),
      purchaseLink: Joi.string().uri()
    }),
    owner: Joi.string().hex()
  });

  return requiredFields ? 
    await eventSchema.tailor('required').validateAsync(data) :
    await eventSchema.validateAsync(data);
}

function getJoiValidationErrors(error) {
  let errorEntries = [];

  if (error.details !== undefined) {
    for (detail of error.details) {
      let context = detail.context;
      let field = context.key;
      let message = context.name === undefined ? detail.message : context.name;
      
      errorEntries.push(new ErrorEntry(field, message));
    }
  }
  
  return errorEntries;
}

module.exports = {
  validateRegister,
  validateLogin,
  validateEventQueryParams,
  validateEvent,
  getJoiValidationErrors,
  validateUserUpdate
}