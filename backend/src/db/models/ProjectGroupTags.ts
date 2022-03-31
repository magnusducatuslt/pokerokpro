import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface ProjectGroupTag extends Model {
  readonly id: string;

  projectGroupId: string;
  tagId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type ProjectGroupTagModel = ModelType<ProjectGroupTag>;

export const ProjectGroupTag = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    projectGroupId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    tagId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define(
    "projectGroupTags",
    attributes
  ) as ProjectGroupTagModel;

  return model;
};
