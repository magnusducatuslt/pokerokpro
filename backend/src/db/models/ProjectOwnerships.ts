import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { FileMeta } from "./FileMetas";

export interface ProjectOwnership extends Model {
  readonly id: string;

  projectId: string;
  fileMetaId: string;

  projectOwnershipsProjectFileMeta?: FileMeta;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type ProjectOwnershipModel = ModelType<ProjectOwnership>;

export const ProjectOwnership = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    projectId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    fileMetaId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define(
    "projectOwnerships",
    attributes
  ) as ProjectOwnershipModel;

  model.associate = function (models) {
    // associations can be defined here
    models.ProjectOwnership.belongsTo(models.Project, {
      foreignKey: "projectId",
      targetKey: "id",
      as: "projectOwnershipsProject",
      onDelete: "cascade",
    });
    models.ProjectOwnership.belongsTo(models.FileMeta, {
      foreignKey: "fileMetaId",
      targetKey: "id",
      as: "projectOwnershipsProjectFileMeta",
      onDelete: "cascade",
    });
  };
  return model;
};
