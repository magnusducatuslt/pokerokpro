import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

export interface HistoryEmail extends Model {
  readonly id: string;

  userId: string;
  oldEmail: string;
  newEmail: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type HistoryEmailModel = ModelType<HistoryEmail>;

export const HistoryEmail = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    kuserId: { type: DataTypes.STRING(250) },
    oldEmail: { type: DataTypes.STRING(250) },
    newEmail: { type: DataTypes.STRING(250) },
    status: { type: DataTypes.STRING(250) },
  };

  const model = dbService.define(
    "historyEmails",
    attributes
  ) as HistoryEmailModel;

  model.associate = function (models) {
    models.HistoryEmail.belongsTo(models.KUser, {
      foreignKey: "kuserId",
      targetKey: "id",
      as: "historyEmailToKuser",
    });
  };
  return model;
};
