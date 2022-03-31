import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface Approval extends Model {
  readonly id: string;

  name: string;
  description: string;
  deadline: Date;
  entityType: string;
  entityId: string;
  statusValue: string;
  users: string;
  usersStatusValue: string;
  entityActionType: string;
  tasks: string;
  markers: string;
  comments: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type ApprovalModel = ModelType<Approval>;

export const Approval = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(250) },
    description: { type: DataTypes.TEXT },
    deadline: { type: DataTypes.DATE },
    entityType: { type: DataTypes.STRING(250) },
    entityId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    statusValue: { type: DataTypes.STRING(250) },
    users: { type: DataTypes.STRING(250) },
    usersStatusValue: { type: DataTypes.STRING(250) },
    entityActionType: { type: DataTypes.STRING(250) },
    tasks: { type: DataTypes.STRING(250) },
    markers: { type: DataTypes.STRING(250) },
    comments: { type: DataTypes.STRING(250) },
  };

  const model = dbService.define("approval", attributes) as ApprovalModel;

  return model;
};
