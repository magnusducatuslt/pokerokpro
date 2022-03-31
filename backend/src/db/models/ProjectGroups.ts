import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

export const PROJECT_GROUP_HAS_MANY_PROJECTS = "childrensProjects";
export const PROJECT_GROUP_HAS_MANY_PROJECT_GROUPS = "childrensProjectGroups";

export interface ProjectGroup extends Model {
  readonly id: string;

  name: string;
  description: string;
  logo: number;
  color: string;
  parentId: string | null;
  companyId: string;
  lvl: number;
  descendants: (string | null)[];
  isArchived: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type ProjectGroupModel = ModelType<ProjectGroup>;

export const ProjectGroup = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(250) },
    description: { type: DataTypes.TEXT },
    logo: { type: DataTypes.TEXT },
    color: { type: DataTypes.STRING(250) },
    companyId: { type: DataTypes.STRING(250) },
    parentId: {
      type: DataTypes.STRING(250),
    },
    lvl: {
      type: DataTypes.INTEGER,
    },
    descendants: {
      type: DataTypes.ARRAY(DataTypes.STRING(250)),
    },
    isArchived: { type: DataTypes.BOOLEAN, defaultValue: false },
  };

  const model = dbService.define(
    "projectGroups",
    attributes
  ) as ProjectGroupModel;

  model.associate = function (models) {
    models.ProjectGroup.hasMany(models.ProjectGroup, {
      foreignKey: "parentId",
      as: PROJECT_GROUP_HAS_MANY_PROJECT_GROUPS,
      onDelete: "cascade",
    });
    models.ProjectGroup.hasMany(models.Project, {
      foreignKey: "projectGroupId",
      as: PROJECT_GROUP_HAS_MANY_PROJECTS,
      onDelete: "cascade",
    });
  };
  return model;
};
