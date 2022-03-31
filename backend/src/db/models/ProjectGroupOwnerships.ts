import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface ProjectGroupOwnership extends Model {
  readonly id: string;

  projectGroupOwnershipId: string;
  fileMetaId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type ProjectGroupOwnershipModel = ModelType<ProjectGroupOwnership>;

export const ProjectGroupOwnership = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    projectGroupOwnershipId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    fileMetaId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define(
    "projectGroupOwnerships",
    attributes
  ) as ProjectGroupOwnershipModel;

  return model;
};
