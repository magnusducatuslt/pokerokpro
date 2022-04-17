import { Sequelize, Model, DataTypes,Optional,ModelAttributes } from "sequelize";
import { ModelType } from "../ModelType";
import { AccountStatistic } from 'entities'

export const TABLE_NAME = "account_statistics";
export const STATISTIC_BELONGS_TO_ACCOUNT= "account"

interface Relations {
  [STATISTIC_BELONGS_TO_ACCOUNT]: AccountStatisticInstance
}
export interface AccountStatisticAttributes extends Optional<AccountStatistic,"id"> {
}

export interface AccountStatisticInstance
  extends Model<AccountStatisticAttributes>,
  AccountStatisticAttributes,Relations {}

export type AccountStatisticModel = ModelType<AccountStatisticInstance>;

export const AccountStatisticModelDefinition = (dbService: Sequelize) => {
  const attributes:ModelAttributes<AccountStatisticInstance>  = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    accountId: { type: DataTypes.UUIDV4, allowNull: false },
    balanceBuyin: { type: DataTypes.DECIMAL(2) },
    balanceBuyout: { type: DataTypes.DECIMAL(2) },
    isWon: { type: DataTypes.BOOLEAN },
    date: { type: DataTypes.DATE },
  };

  const model = dbService.define(TABLE_NAME, attributes,{timestamps:false}) as AccountStatisticModel;

  model.associate = function (models) {
    models.AccountStatistic.belongsTo(models.Account, {
      foreignKey: "id",
      as: STATISTIC_BELONGS_TO_ACCOUNT,
    });
  };

  return model;
};
