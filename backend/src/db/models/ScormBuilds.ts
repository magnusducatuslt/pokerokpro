import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

export interface ScormBuilds extends Model {
  readonly id: string;

  projectId: string;
  version: string;
  build: number;
  isArchived: boolean;

  readonly createdAt: Date;
  readonly updateAt: Date;
}

export type ScormBuildsModel = ModelType<ScormBuilds>;

export const ScormBuilds = (dbService: Sequelize) => {
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
      references: {
        model: "projects",
        key: "id",
      },
    },
    build: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    isArchived: { type: DataTypes.BOOLEAN, defaultValue: false },
  };

  const model = dbService.define("scormBuilds", attributes) as ScormBuildsModel;

  return model;
};
