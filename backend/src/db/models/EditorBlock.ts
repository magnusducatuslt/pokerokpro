import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import {
  EditorElement,
  EditorBlockOptions,
  EditorBlockMode,
  EditorBlockQuestionFeedbackT,
} from "@core/models";

export const TABLE_NAME = "editorBlocks";

export interface EditorBlock extends Model {
  readonly id: string;
  readonly uuid: string;

  name: string;
  test: any;
  elements: {
    [key: string]: EditorElement;
  };
  schema: string[][][];
  options: EditorBlockOptions;
  mode: EditorBlockMode;
  type: string;
  sectionId: string;
  isActive: boolean;
  version: number;
  questionFeedback: EditorBlockQuestionFeedbackT;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type EditorBlockModel = ModelType<EditorBlock>;

export const EditorBlock = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    uuid: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    test: { type: DataTypes.JSONB, allowNull: true },
    mode: { type: DataTypes.STRING(250) },
    type: { type: DataTypes.STRING(250) },
    elements: {
      type: DataTypes.JSONB,
      allowNull: false,
      set(value: any) {
        this.setDataValue("elements", value ? value : {});
      },
      get() {
        const rawValue = this.getDataValue("elements");
        return rawValue ? rawValue : {};
      },
    },
    schema: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    options: { type: DataTypes.JSONB, allowNull: true },
    sectionId: { type: DataTypes.STRING(250), allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    version: { type: DataTypes.INTEGER, defaultValue: 1 },
  };

  const model = dbService.define(TABLE_NAME, attributes) as EditorBlockModel;

  model.associate = function (models) {
    models.EditorBlock.belongsTo(models.EditorSection, {
      foreignKey: "sectionId",
      targetKey: "id",
      as: "editorBlockToEditorSection",
      onDelete: "cascade",
    });
    models.EditorBlock.hasMany(models.Task, {
      as: "editorBlockHasManyTasks",
      foreignKey: "blockId",
      onDelete: "cascade",
    });
  };

  return model;
};
