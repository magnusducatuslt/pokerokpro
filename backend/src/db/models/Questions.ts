import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface Question extends Model {
  readonly id: string;

  schemaId: string;
  text: string;
  templateId: string;
  templateType: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type QuestionModel = ModelType<Question>;

export const Question = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    schemaId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    text: { type: DataTypes.TEXT },
    templateId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    templateType: { type: DataTypes.STRING(250) },
  };

  const model = dbService.define("questions", attributes) as QuestionModel;

  return model;
};
