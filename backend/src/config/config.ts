import * as Joi from "joi";
import { configSchema } from "./schemas/config";
import { parseEnv } from "./parser";

const envFile = ".env";

const env = parseEnv({ envFile });
const { error, value: envVars } = Joi.validate(env, configSchema);

if (error) {
  throw new Error(`Service API config validation e.message: ${error.message}`);
}

function normalizeNumber(val: string) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return -1;
  }
  if (port >= 0) {
    return port;
  }
  return 0;
}

const config = {
  env: envVars.NODE_ENV,
  versionBuild: envVars.VERSION_BACKEND_BUILD,
  apolloDebug: JSON.parse(envVars.DEBUG_SHOW),
  mainInfo: {
    frontDomain: envVars.HOSTNAME_FORWARDING,
  },
  keepAlive: normalizeNumber(envVars.KEEP_A_LIVE),
  be: {
    port: normalizeNumber(envVars.CORE_PORT),
    domain: envVars.CORE_DOMAIN,
  },
  postgres: {
    config: {
      domain: envVars.DATABASE_POSTGRES_DOMAIN,
      user: envVars.DATABASE_POSTGRES_USER,
      database: envVars.DATABASE_POSTGRES_DATABASE,
      password: envVars.DATABASE_POSTGRES_PASSWORD,
      port: normalizeNumber(envVars.DATABASE_POSTGRES_PORT),
      certificate: envVars.DATABASE_POSTGRES_CERTIFICATE,
    },
    pgadmin: {
      defaultEmail: envVars.DATABASE_PGADMIN_DEFAULT_EMAIL,
      defaultPassword: envVars.DATABASE_PGADMIN_DEFAULT_PASSWORD,
      port: normalizeNumber(envVars.DATABASE_PGADMIN_PORT),
    },
  },
  redis: {
    username: envVars.DATABASE_REDIS_USERNAME,
    password: envVars.DATABASE_REDIS_PASSWORD,
    domain: envVars.DATABASE_REDIS_DOMAIN,
    port: normalizeNumber(envVars.DATABASE_REDIS_PORT),
  },
  logs: {
    lvl: envVars.LOGS_LVL,
    format: envVars.LOGS_FORMAT,
    path: envVars.LOGS_PATH,
  },
  // elastic: {
  //   domain: envVars.ELASTICSEARCH_DOMAIN,
  //   port: normalizeNumber(envVars.ELASTICSEARCH_PORT),
  // },
};

export { config };
