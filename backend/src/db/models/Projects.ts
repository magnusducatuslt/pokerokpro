import { EditorSectionOrderType, PublicBlock, PublicSettings } from "models";
import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { FileMeta } from "./FileMetas";

export const PROJECT_BELONG_TO_MANY_EMPLOYEE = "projectEmployee";

export interface Project extends Model {
  readonly id: string;

  name: string;
  accent: string;
  ownerId: string;
  companyId: string;
  projectGroupId: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  cost: number;

  publicSettings: PublicSettings;
  progressShouldBeGreaterThen: number;
  progressShouldBeLeastThen: number;
  finalTestId: string;

  learningGoals: string;
  learningObjectives: string;
  isArchived: boolean;

  sectionsOrder: EditorSectionOrderType[];
  publicBlocks: PublicBlock[];
  projectFileMeta: FileMeta[];
  tags: string[];
  test: any;
  isDone: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type ProjectModel = ModelType<Project>;

export const Project = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(250) },
    accent: { type: DataTypes.STRING(250) },
    ownerId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    companyId: { type: DataTypes.STRING(250), allowNull: false },
    projectGroupId: {
      type: DataTypes.STRING(250),
    },
    startDate: { type: DataTypes.DATE },
    endDate: { type: DataTypes.DATE },
    budget: { type: DataTypes.FLOAT(20) },
    cost: { type: DataTypes.INTEGER },
    progressShouldBeGreaterThen: { type: DataTypes.INTEGER, defaultValue: 80 },
    progressShouldBeLeastThen: { type: DataTypes.INTEGER, defaultValue: 20 },
    finalTestId: { type: DataTypes.TEXT },
    // TODO write migration to move to publicSettings
    // publicImage: { type: DataTypes.TEXT },
    // publicDescription: { type: DataTypes.TEXT },
    // publicCourseName: { type: DataTypes.TEXT },
    // publicAuthorImage: { type: DataTypes.TEXT },
    // publicAuthorName: { type: DataTypes.TEXT },
    learningGoals: { type: DataTypes.STRING(250) },
    learningObjectives: { type: DataTypes.STRING(250) },
    sectionsOrder: { type: DataTypes.JSONB },
    publicBlocks: { type: DataTypes.JSONB },
    // TODO create migration to create field
    publicSettings: { type: DataTypes.JSONB },
    tags: { type: DataTypes.ARRAY(DataTypes.TEXT) },
    isArchived: { type: DataTypes.BOOLEAN, defaultValue: false },
    isDone: { type: DataTypes.BOOLEAN, defaultValue: false },
  };

  const model = dbService.define("projects", attributes) as ProjectModel;

  model.associate = function (models) {
    models.Project.belongsTo(models.ProjectGroup, {
      foreignKey: "projectGroupId",
      targetKey: "id",
      as: "projectParent",
      onDelete: "cascade",
    });
    models.Project.belongsTo(models.Company, {
      foreignKey: "companyId",
      targetKey: "id",
      as: "projectCompany",
      onDelete: "cascade",
    });
    models.Project.belongsToMany(models.Employee, {
      through: models.Participant,
      foreignKey: "projectId",
      targetKey: "id",
      as: PROJECT_BELONG_TO_MANY_EMPLOYEE,
      onDelete: "cascade",
    });
    models.Project.hasMany(models.Participant, {
      foreignKey: "projectId",
      as: "directProjectEmployee",
      onDelete: "cascade",
    });
    models.Project.belongsToMany(models.FileMeta, {
      through: models.ProjectOwnership,
      foreignKey: "projectId",
      targetKey: "id",
      as: "projectFileMeta",
      onDelete: "cascade",
    });
    models.Project.belongsToMany(models.Tag, {
      through: models.ProjectTag,
      foreignKey: "projectId",
      targetKey: "id",
      as: "projectToTags",
      onDelete: "cascade",
    });
    models.Project.hasMany(models.EditorSection, {
      foreignKey: "projectId",
      as: "projectHasSections",
      onDelete: "cascade",
    });
    models.Project.hasMany(models.Task, {
      foreignKey: "projectId",
      as: "projectHasTasks",
    });
  };
  return model;
};
