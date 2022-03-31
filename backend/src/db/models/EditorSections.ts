import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { EditorBlock } from "models";

export interface EditorSection extends Model {
  readonly id: string;

  name: string;
  isDone: boolean;
  description: string;
  type: string;
  projectId: string;
  lvl: number;
  participants: string[];
  deadline: Date;
  blocksOrder: string[];
  totalCost: number;
  tags: string[];
  isChapter: boolean;
  isArchived: boolean;
  test: any;
  sectionToBlocks?: EditorBlock[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type EditorSectionModel = ModelType<EditorSection>;

export const EditorSection = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(250) },
    isDone: { type: DataTypes.BOOLEAN, allowNull: false },
    description: { type: DataTypes.TEXT, defaultValue: null },
    type: { type: DataTypes.STRING(250), allowNull: false },
    projectId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    lvl: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    tags: { type: DataTypes.ARRAY(DataTypes.TEXT) },
    participants: DataTypes.ARRAY(DataTypes.STRING(250)),
    deadline: { type: DataTypes.DATE },
    blocksOrder: DataTypes.ARRAY(DataTypes.STRING(250)),
    preferences: { type: DataTypes.STRING(250), defaultValue: null },
    totalCost: { type: DataTypes.INTEGER },
    isArchived: { type: DataTypes.BOOLEAN, defaultValue: false },
    isChapter: { type: DataTypes.BOOLEAN, allowNull: false },
    test: { type: DataTypes.JSONB },
    formats: { type: DataTypes.JSONB },
  };

  const model = dbService.define(
    "editorSections",
    attributes
  ) as EditorSectionModel;

  model.associate = function (models) {
    model.hasMany(models.EditorBlock, {
      foreignKey: "sectionId",
      as: "sectionToBlocks",
      onDelete: "cascade",
    });
    model.belongsTo(models.Project, {
      foreignKey: "projectId",
      as: "sectionsToProject",
      targetKey: "id",
      onDelete: "cascade",
    });
    model.hasMany(models.Task, {
      foreignKey: "sectionId",
      as: "sectionHasTasks",
      onDelete: "cascade",
    });
  };

  return model;
};
