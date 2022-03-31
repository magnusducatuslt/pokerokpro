import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface TaskTodo extends Model {
  readonly id: string;

  taskId: string;
  text: string;
  status: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type TaskTodoModel = ModelType<TaskTodo>;

export const TaskTodo = (dbService: Sequelize) => {
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
    text: { type: DataTypes.TEXT },
    status: { type: DataTypes.INTEGER },
  };

  const model = dbService.define("taskTodos", attributes) as TaskTodoModel;

  return model;
};
