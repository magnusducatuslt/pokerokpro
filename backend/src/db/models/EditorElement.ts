import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface EditorElement extends Model {
  readonly id: string;

  type: string;
  value: string;
  containerOptions: string;
  preferences: string;
  formatId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type EditorElementModel = ModelType<EditorElement>;

export const EditorElement = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    type: { type: DataTypes.STRING(250) },
    value: { type: DataTypes.STRING(250) },
    containerOptions: { type: DataTypes.STRING(250) },
    preferences: { type: DataTypes.STRING(250) },
    formatId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define(
    "editorElement",
    attributes
  ) as EditorElementModel;

  return model;
};
