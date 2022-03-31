import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface EditorBlockTest extends Model {
  readonly id: string;

  isVisible: boolean;
  timeleft: Date;
  actionType: string;
  onFail: boolean;
  onSuccess: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type EditorBlockTestModel = ModelType<EditorBlockTest>;

export const EditorBlockTest = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    isVisible: { type: DataTypes.BOOLEAN },
    timeleft: { type: DataTypes.DATE },
    actionType: { type: DataTypes.STRING(250) },
    onFail: { type: DataTypes.BOOLEAN },
    onSuccess: { type: DataTypes.BOOLEAN },
  };

  const model = dbService.define(
    "editorBlockTests",
    attributes
  ) as EditorBlockTestModel;

  return model;
};
