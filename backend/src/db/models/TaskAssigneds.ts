import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { Task } from "./Tasks";
import { Employee } from "./Employees";

export interface TaskAssign extends Model {
  readonly id: string;

  employeeId: string;
  taskId: string;
  taskAssignToTask: Task;
  taskAssignToEmployee: Employee;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type TaskAssignModel = ModelType<TaskAssign>;

export const TaskAssign = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    employeeId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    taskId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define(
    "taskAssigneds",
    attributes
  ) as TaskAssignModel;

  model.associate = function (models) {
    models.TaskAssign.belongsTo(models.Task, {
      foreignKey: "taskId",
      targetKey: "id",
      as: "taskAssignToTask",
      onDelete: "cascade",
    });
    models.TaskAssign.belongsTo(models.Employee, {
      foreignKey: "employeeId",
      targetKey: "id",
      as: "taskAssignToEmployee",
      onDelete: "cascade",
    });
  };

  return model;
};
