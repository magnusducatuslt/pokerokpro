import * as Joi from "joi";

const schema: Joi.SchemaMap = {
  NODE_ENV: Joi.string()
    .default("local"),
  VERSION_BACKEND_BUILD: Joi.string().required(),

  APP_DOMAIN: Joi.string().required(),
  APP_PORT: Joi.string().required(),

  DATABASE_POSTGRES_DOMAIN: Joi.string().required(),
  DATABASE_POSTGRES_USER: Joi.string().required(),
  DATABASE_POSTGRES_DATABASE: Joi.string().required(),
  DATABASE_POSTGRES_PASSWORD: Joi.string().required(),
  DATABASE_POSTGRES_PORT: Joi.number().required(),
  DATABASE_POSTGRES_CERTIFICATE: Joi.string().required(),

  DATABASE_PGADMIN_DEFAULT_EMAIL: Joi.string().required(),
  DATABASE_PGADMIN_DEFAULT_PASSWORD: Joi.string().required(),
  DATABASE_PGADMIN_PORT: Joi.number().required(),
};

export const configSchema = Joi.object().keys(schema).unknown().required();
