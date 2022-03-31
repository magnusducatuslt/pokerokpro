import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface Variant extends Model {
  readonly id: string;

  answerId: string;
  questionId: string;
  rightAnswerId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type VariantModel = ModelType<Variant>;

export const Variant = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    answerId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    questionId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    rightAnswerId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define("variants", attributes) as VariantModel;

  return model;
};
