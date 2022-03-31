import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface EmployerInfo extends Model {
  readonly id: string;

  info: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type EmployerInfoModel = ModelType<EmployerInfo>;

export const EmployerInfo = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    info: { type: DataTypes.TEXT },
  };

  const model = dbService.define(
    "employerInfos",
    attributes
  ) as EmployerInfoModel;

  return model;
};
