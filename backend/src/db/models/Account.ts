import { Sequelize, Model, DataTypes,Optional,ModelAttributes } from "sequelize";
import { ModelType } from "../ModelType";
import {UserInstance} from './User'
import {Account as AccountEntity} from 'entities'
import {AccountStatisticInstance} from "./AccountStatistic";

export const TABLE_NAME = "accounts";
export const ACCOUNTS_BELONGS_TO_USER = "user"
export const STATISTIC_BELONGS_TO_ACCOUNT = "statistic"

interface Relations {
  [ACCOUNTS_BELONGS_TO_USER]:UserInstance
  [STATISTIC_BELONGS_TO_ACCOUNT]:AccountStatisticInstance
}
export interface AccountAttributes extends Optional<AccountEntity,"id"> {
}

interface AccountCreationAttributes extends Optional<AccountAttributes, "id"> {}

export interface AccountInstance
  extends Model<AccountAttributes, AccountCreationAttributes>,
  AccountAttributes,Relations {}

export type AccountModel = ModelType<AccountInstance>;

export const Account = (dbService: Sequelize) => {
  const attributes:ModelAttributes<AccountInstance,AccountAttributes>  = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    accountName: { type: DataTypes.STRING(250), unique: true, allowNull: false, key: 'username_uniq' },
    accountId: { type: DataTypes.STRING(250), allowNull: false }, 
    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references:{
        model: 'users',
        key: 'id'
      }
    },
    platform: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    status: { type: DataTypes.STRING(50) },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
    game: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
    balance: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
    position: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
    pubKey: { type: DataTypes.STRING(250) },
  };

  const model = dbService.define(TABLE_NAME, attributes,{timestamps:false}) as AccountModel;

  model.associate = function (models) {
    models.Account.belongsTo(models.User, {
      foreignKey: "id",
      as: ACCOUNTS_BELONGS_TO_USER,
    });
    models.Account.hasMany(models.AccountStatistic, {
      foreignKey: "accountId",
      as: STATISTIC_BELONGS_TO_ACCOUNT,
    });
  };

  return model;
};
