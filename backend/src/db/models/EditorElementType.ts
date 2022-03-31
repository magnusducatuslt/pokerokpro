import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface EditorElementType extends Model {
  readonly id: string;

  type: string;
  isActive: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type EditorElementTypeModel = ModelType<EditorElementType>;

export const EditorElementType = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    type: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
  };

  const model = dbService.define(
    "editorElementType",
    attributes
  ) as EditorElementTypeModel;

  return model;
};
