import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface Account extends Model {
  readonly id: string;

  platform: string;
  userId: string;
  status: string;
  isActive: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type AccountModel = ModelType<Account>;

export const Account = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    platform: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    status: { type: DataTypes.STRING(250) },
    contractId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define("agreements", attributes) as AccountModel;

  model.associate = function (models) {
    models.Account.belongsTo(models.User, {
      foreignKey: "id",
      as: 'user',
    });
  };
};
