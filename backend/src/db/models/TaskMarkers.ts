import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface TaskMarker extends Model {
  readonly id: string;

  taskId: string;
  markerId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type TaskMarkerModel = ModelType<TaskMarker>;

export const TaskMarker = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    taskId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    markerId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define("taskMarkers", attributes) as TaskMarkerModel;

  return model;
};
