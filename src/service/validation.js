import joi from 'joi';

export function validateCreate(data) {
  const schema = joi.object({
    name: joi.string().min(4).max(50),
    email: joi.string().email(),
    password: joi.string().min(7).max(50),
    admin: joi.boolean(),
  });

  return schema.validate(data);
}

export function validateLogin(data) {
  const schema = joi.object({
    email: joi.string().email(),
    password: joi.string().min(7).max(50),
  });

  return schema.validate(data);
}
