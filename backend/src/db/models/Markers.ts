import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface Marker extends Model {
  readonly id: string;

  color: string;
  name: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type MarkerModel = ModelType<Marker>;

export const Marker = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    color: { type: DataTypes.STRING(250) },
    name: { type: DataTypes.STRING(250) },
  };

  const model = dbService.define("markers", attributes) as MarkerModel;

  return model;
};
