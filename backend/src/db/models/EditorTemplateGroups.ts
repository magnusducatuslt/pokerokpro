import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { EditorTemplateGroupCreatedForEnum } from "@core/models";

export const TABLE_NAME = "editorTemplateGroups";
export interface EditorTemplateGroup extends Model {
  readonly id: string;

  name: string;
  color: string;
  companyId: string;
  projectId: string;
  descendants: (string | null)[];
  editorTemplateOrder: string[];
  description: string;
  isArchived: boolean;
  createdFor: EditorTemplateGroupCreatedForEnum;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type EditorTemplateGroupModel = ModelType<EditorTemplateGroup>;

export const EditorTemplateGroup = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(250) },
    color: { type: DataTypes.STRING(250) },
    companyId: { type: DataTypes.STRING(250) },
    projectId: { type: DataTypes.STRING(250) },
    descendants: {
      type: DataTypes.ARRAY(DataTypes.STRING(250)),
    },
    editorTemplateOrder: DataTypes.ARRAY(DataTypes.STRING(250)),
    description: { type: DataTypes.TEXT },
    isArchived: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdFor: {
      type: DataTypes.ENUM,
      values: [...Object.values(EditorTemplateGroupCreatedForEnum)],
    },
  };

  const model = dbService.define(
    TABLE_NAME,
    attributes
  ) as EditorTemplateGroupModel;

  model.associate = function (models) {
    models.EditorTemplateGroup.hasMany(models.EditorTemplate, {
      foreignKey: "editorTemplateGroupId",
      as: "editorTemplateGroupToEditorTemplate",
      onDelete: "cascade",
    });
  };

  return model;
};
