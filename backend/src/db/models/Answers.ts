import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface Answer extends Model {
  readonly id: string;

  name: string;
  value: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type AnswerModel = ModelType<Answer>;

export const Answer = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(250) },
    value: { type: DataTypes.STRING(250) },
  };

  const model = dbService.define("answers", attributes) as AnswerModel;

  return model;
};
