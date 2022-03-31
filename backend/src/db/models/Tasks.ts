import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

export interface Task extends Model {
  readonly id: string;

  name: string;
  description: string;
  deadline: number;
  type: string;
  todo: JSON;
  status: string;

  isDone: boolean;

  timelog: number | null;
  pushedInWork: number;
  doneTime: Date;

  parentId: string;
  employeeId: string;
  companyId: string;
  projectId: string;
  sectionId: string;
  blockId: string;
  ownerId: string;
  assignedId: string;

  isArchived: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type TaskModel = ModelType<Task>;

export const Task = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(250), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    type: { type: DataTypes.STRING(250), allowNull: true },
    todo: { type: DataTypes.JSONB, allowNull: true },
    status: { type: DataTypes.STRING(250), allowNull: false },
    employeeId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    blockId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    sectionId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    projectId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    parentId: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    companyId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isDone: { type: DataTypes.BOOLEAN, defaultValue: false },
    timelog: { type: DataTypes.INTEGER, allowNull: true },
    pushedInWork: {
      type: DataTypes.DATE,
      allowNull: true,
      set(value: any) {
        this.setDataValue("pushedInWork", value ? value.toISOString() : null);
      },
      get() {
        const rawValue = this.getDataValue("pushedInWork");
        return rawValue ? new Date(rawValue).getTime() : 0;
      },
    },
    doneTime: {
      type: DataTypes.DATE,
      allowNull: true,
      set(value: any) {
        this.setDataValue("doneTime", value ? value.toISOString() : null);
      },
      get() {
        const rawValue = this.getDataValue("doneTime");
        return rawValue ? new Date(rawValue).getTime() : null;
      },
    },
    ownerId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    assignedId: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  };

  const model = dbService.define("tasks", attributes) as TaskModel;
  model.associate = function (models) {
    models.Task.belongsTo(models.Employee, {
      as: "taskToEmployeeById",
      foreignKey: "employeeId",
      targetKey: "id",
    });
    models.Task.belongsTo(models.Employee, {
      as: "taskToEmployeeAssignedById",
      foreignKey: "assignedId",
      targetKey: "id",
    });
    models.Task.belongsTo(models.Employee, {
      as: "taskToEmployeeOwnerById",
      foreignKey: "ownerId",
      targetKey: "id",
    });
    models.Task.belongsTo(models.Project, {
      as: "taskToProjectById",
      foreignKey: "projectId",
      targetKey: "id",
    });
    models.Task.belongsTo(models.EditorSection, {
      as: "tasksBelongsToSectionId",
      foreignKey: "sectionId",
      targetKey: "id",
    });
    models.Task.belongsTo(models.EditorBlock, {
      as: "tasksBelongsToEditorBlock",
      foreignKey: "blockId",
      targetKey: "uuid",
    });
    /**
    models.Task.belongsToMany(models.Employee, {
      through: models.TaskAssign,
      foreignKey: "taskId",
      targetKey: "id",
      as: "taskToEmployee",
      onDelete: "cascade",
    });
    */
  };
  return model;
};
