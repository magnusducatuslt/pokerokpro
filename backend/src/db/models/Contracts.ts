import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface Contract extends Model {
  readonly id: string;

  number: number;
  startDate: Date;
  endDate: Date;
  tags: string;
  formats: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type ContractModel = ModelType<Contract>;

export const Contract = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    number: { type: DataTypes.INTEGER },
    startDate: { type: DataTypes.DATE },
    endDate: { type: DataTypes.DATE },
    tags: { type: DataTypes.STRING },
    formats: { type: DataTypes.STRING },
  };

  const model = dbService.define("contracts", attributes) as ContractModel;

  return model;
};
