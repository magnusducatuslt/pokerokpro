import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

export interface ProjectTag extends Model {
  readonly id: string;

  groupTagsId: string;
  projectId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type ProjectTagModel = ModelType<ProjectTag>;

export const ProjectTag = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    groupTagsId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    projectId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define("projectTags", attributes) as ProjectTagModel;

  model.associate = function (models) {
    models.ProjectTag.belongsTo(models.Tag, {
      foreignKey: "groupTagsId",
      targetKey: "id",
      as: "projectTagToTags",
      onDelete: "cascade",
    });
    models.ProjectTag.belongsTo(models.Project, {
      foreignKey: "projectId",
      targetKey: "id",
      as: "projectTagToProject",
      onDelete: "cascade",
    });
  };

  return model;
};
