import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface TaskOwnership extends Model {
  readonly id: string;

  projectOwnershipId: string;
  taskId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type TaskOwnershipModel = ModelType<TaskOwnership>;

export const TaskOwnership = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    projectOwnershipId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    taskId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define(
    "taskOwnerships",
    attributes
  ) as TaskOwnershipModel;

  return model;
};
