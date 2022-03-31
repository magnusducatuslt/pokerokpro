import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { Employee } from "./Employees";

export interface Position extends Model {
  readonly id: string;

  name: string;
  unit: string;
  positionToEmployee: Employee[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type PositionModel = ModelType<Position>;

export const Position = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    unit: { type: DataTypes.STRING(250) },
  };

  const model = dbService.define("positions", attributes) as PositionModel;

  return model;
};
