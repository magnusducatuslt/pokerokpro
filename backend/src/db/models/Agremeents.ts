import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface Agreement extends Model {
  readonly id: string;

  projectId: string;
  employeeId: string;
  status: string;
  contractId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type AgreementModel = ModelType<Agreement>;

export const Agreement = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    projectId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    status: { type: DataTypes.STRING(250) },
    contractId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define("agreements", attributes) as AgreementModel;

  return model;
};
