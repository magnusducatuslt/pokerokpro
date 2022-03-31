import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { FileMetaTypeEnum } from "@core/models";

export interface FileMetaGroup extends Model {
  readonly id: string;

  name: string;
  color: string;
  parentId: string | null;
  companyId: string;
  projectId: string;
  lvl: number;
  descendants: (string | null)[];
  isArchived: boolean;
  createdFor: FileMetaTypeEnum;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type FileMetaGroupModel = ModelType<FileMetaGroup>;

export const FileMetaGroup = (dbService: Sequelize) => {
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
    parentId: {
      type: DataTypes.STRING(250),
    },
    lvl: {
      type: DataTypes.INTEGER,
    },
    descendants: {
      type: DataTypes.ARRAY(DataTypes.STRING(250)),
    },
    createdFor: {
      type: DataTypes.ENUM,
      values: ["owner", "projects", "companies"],
    },
    isArchived: { type: DataTypes.BOOLEAN, defaultValue: false },
  };

  const model = dbService.define(
    "fileMetaGroups",
    attributes
  ) as FileMetaGroupModel;

  model.associate = function (models) {
    models.FileMetaGroup.hasMany(models.FileMeta, {
      foreignKey: "fileMetaGroupIds",
      as: "fileMetaGroupToFileMeta",
      onDelete: "cascade",
    });
  };
  return model;
};
