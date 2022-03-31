import * as Joi from "joi";
import path from "path";
import fs from "fs";
import { configSchema } from "./schemas/config";
import { parse } from "dotenv";

const env = parse(fs.readFileSync(path.resolve(process.cwd(), `.env`)));

const { error, value: envVars } = configSchema.validate(env);

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

export const config = {
  env: envVars.NODE_ENV,
  versionBuild: envVars.VERSION_BACKEND_BUILD,
  app: {
    port: normalizeNumber(envVars.APP_PORT),
    domain: envVars.APP_DOMAIN,
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
};


