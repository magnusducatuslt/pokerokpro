import * as Joi from "joi";

const schema: Joi.SchemaMap = {
  NODE_ENV: Joi.string()
    .allow(["development", "production", "test"])
    .default("development"),
  DEBUG_SHOW: Joi.string().required(),

  FRONT_DOMAIN: Joi.string().required(),
  HOSTNAME_FORWARDING: Joi.string().required(),

  BE_PORT: Joi.number().required(),
  BE_DOMAIN: Joi.string().required(),
  BE_GRAPHQL_ROUTE: Joi.string().required(),

  DATABASE_POSTGRES_DOMAIN: Joi.string().required(),
  DATABASE_POSTGRES_USER: Joi.string().required(),
  DATABASE_POSTGRES_DATABASE: Joi.string().required(),
  DATABASE_POSTGRES_PASSWORD: Joi.string().required(),
  DATABASE_POSTGRES_PORT: Joi.number().required(),

  DATABASE_PGADMIN_DEFAULT_EMAIL: Joi.string().required(),
  DATABASE_PGADMIN_DEFAULT_PASSWORD: Joi.string().required(),
  DATABASE_PGADMIN_PORT: Joi.number().required(),

  // DATABASE_REDIS_USERNAME: Joi.string().required(),
  // DATABASE_REDIS_DOMAIN: Joi.string().required(),
  // DATABASE_REDIS_PORT: Joi.number().required(),

  LOGS_LVL: Joi.string().required(),
  LOGS_FORMAT: Joi.string().required(),
  LOGS_PATH: Joi.string().required(),
};

export const configSchema = Joi.object().keys(schema).unknown().required();
