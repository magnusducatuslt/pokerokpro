import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { Project } from "./Projects";
import { Employee } from "./Employees";

export const TAGS_BELONGS_TO_MANY_PROJECTS = "tagsToProject";

export interface Tag extends Model {
  readonly id: string;

  name: string;
  parentId: string;
  color: string;
  tagsToProject: Project[];
  tagsToEmployees: Employee[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type TagModel = ModelType<Tag>;

export const Tag = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(250) },
    parentId: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    companyId: { type: DataTypes.STRING(250), allowNull: false },
    color: { type: DataTypes.STRING(250) },
  };

  const model = dbService.define("tags", attributes) as TagModel;

  model.associate = function (models) {
    models.Tag.belongsTo(models.Company, {
      as: "companyTags",
      foreignKey: "companyId",
      targetKey: "id",
    });
    models.Tag.belongsToMany(models.Project, {
      through: models.ProjectTag,
      foreignKey: "groupTagsId",
      targetKey: "id",
      as: TAGS_BELONGS_TO_MANY_PROJECTS,
      onDelete: "cascade",
    });
    models.Tag.belongsToMany(models.Employee, {
      through: models.EmployeeTag,
      foreignKey: "tagId",
      targetKey: "id",
      as: "tagsToEmployees",
      onDelete: "cascade",
    });
  };

  return model;
};
