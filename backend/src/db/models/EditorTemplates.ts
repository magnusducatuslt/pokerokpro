import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import {
  EditorElement,
  EditorBlockOptions,
  EditorTemplateCreatedFor,
} from "@core/models";

export const TABLE_NAME = "editorTemplates";
export interface EditorTemplate extends Model {
  readonly id: string;
  readonly uuid: string;

  name: string;
  test: any;
  mode: string;
  type: string;
  elements: {
    [key: string]: EditorElement;
  };

  employeeId: string;
  projectId: string;
  companyId: string;
  aggregateType: string;

  schema: string[][][];
  options: EditorBlockOptions;
  isArchived: boolean;
  createdFor: EditorTemplateCreatedFor;
  editorTemplateGroupId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type EditorTemplateModel = ModelType<EditorTemplate>;

export const EditorTemplate = (dbService: Sequelize) => {
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
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    projectId: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    companyId: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    aggregateType: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    test: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
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
    options: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    createdFor: {
      type: DataTypes.ENUM,
      values: ["general", "employee", "project", "company"],
    },
    editorTemplateGroupId: {
      type: DataTypes.STRING(250),
    },
    isArchived: { type: DataTypes.BOOLEAN, defaultValue: true },
  };

  const model = dbService.define(TABLE_NAME, attributes) as EditorTemplateModel;

  model.associate = function (models) {
    models.EditorTemplate.belongsToMany(models.FileMeta, {
      through: models.TemplateOwnership,
      foreignKey: "templateId",
      targetKey: "id",
      as: "templateToFileMeta",
      onDelete: "cascade",
    });
    models.EditorTemplate.belongsTo(models.EditorTemplateGroup, {
      foreignKey: "editorTemplateGroupId",
      targetKey: "id",
      as: "editorTemplateToEditorTemplateGroup",
      onDelete: "cascade",
    });
  };

  return model;
};
