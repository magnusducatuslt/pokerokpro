import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { NotificationTask } from "@core/models";
export interface Notification extends Model {
  readonly id: string;

  type: string;
  employeeId: string;
  employeeIdOwner: string;
  count?: number;
  entity: string;
  entityId: string;
  isNew: boolean;

  task?: NotificationTask;
  isDead?: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type NotificationModel = ModelType<Notification>;

export const Notification = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    employeeId: { type: DataTypes.STRING(250) },
    employeeIdOwner: { type: DataTypes.STRING(250) },
    type: { type: DataTypes.STRING(250) },
    count: { type: DataTypes.INTEGER, defaultValue: 1 },
    entity: { type: DataTypes.STRING(250) },
    entityId: { type: DataTypes.STRING(250) },
    isNew: { type: DataTypes.BOOLEAN, defaultValue: true },

    task: { type: DataTypes.JSONB, allowNull: true },
    isDead: { type: DataTypes.BOOLEAN, defaultValue: false },
  };

  const model = dbService.define(
    "notifications",
    attributes
  ) as NotificationModel;

  return model;
};
