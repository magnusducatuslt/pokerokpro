import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface Format extends Model {
  readonly id: string;

  name: string;
  description: string;
  type: string;
  cost: number;
  unitType: string;
  count: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type FormatModel = ModelType<Format>;

export const Format = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(250) },
    description: { type: DataTypes.TEXT },
    type: { type: DataTypes.STRING(250) },
    cost: { type: DataTypes.INTEGER },
    unitType: { type: DataTypes.STRING(250) },
    count: { type: DataTypes.INTEGER },
  };

  const model = dbService.define("formats", attributes) as FormatModel;

  return model;
};
