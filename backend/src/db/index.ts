import { getDatabase } from "../infra/database";
import { Sequelize, Options } from "sequelize";


// import { Account } from "./models/Accounts";
import { User } from "./models/User";

const database = getDatabase();

const db = (sequelize: Sequelize = database) => ({
  // Account: Account(sequelize),
  User: User(sequelize),
});

const orm = db();

type DbType = ReturnType<typeof db> & {
  sequelize: Sequelize;
};

Object.keys(orm).forEach((modelName) => {
  const internalDb = orm as DbType & { [key: string]: any };
  if (internalDb[modelName].associate) {
    internalDb[modelName].associate(orm);
  }
});

const client: DbType = Object.assign({}, orm, { sequelize: database });

const initDatabase = (connectionConfig?: Options): DbType => {
  const sequelizeClient = getDatabase(connectionConfig);
  const databaseClient = db(sequelizeClient);

  Object.keys(databaseClient).forEach((modelName) => {
    const internalDb = databaseClient as DbType & { [key: string]: any };
    if (internalDb[modelName].associate) {
      internalDb[modelName].associate(databaseClient);
    }
  });

  return Object.assign({}, databaseClient, { sequelize: sequelizeClient });
};

type DbModels = typeof orm;

export * from "./ModelType";
export { client as db, DbType, initDatabase, DbModels };
