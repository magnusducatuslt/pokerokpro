import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface ProjectSetting extends Model {
  readonly id: string;

  testSuccessValue: boolean;
  readSuccessDiscount: boolean;
  isDirect: string;
  projectId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type ProjectSettingModel = ModelType<ProjectSetting>;

export const ProjectSetting = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    testSuccessValue: { type: DataTypes.BOOLEAN },
    readSuccessDiscount: { type: DataTypes.BOOLEAN },
    isDirect: { type: DataTypes.STRING(250) },
    projectId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define(
    "projectSettings",
    attributes
  ) as ProjectSettingModel;

  return model;
};
