import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

export const GROUP_TO_TOPIC = "notificationGroupToTopics";

export const TABLE_NAME = "notificationGroups";

export type NotificationGroup = {
  readonly id: string;

  name: string;
  model: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export interface NotificationGroupI extends NotificationGroup, Model {}

export type NotificationGroupsModel = ModelType<NotificationGroupI>;

export const attributes: Record<keyof NotificationGroup, any> = {
  id: {
    type: DataTypes.STRING(250),
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },

  name: { type: DataTypes.STRING(250) },

  model: { type: DataTypes.STRING(250) },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
};

export const NotificationGroups = (dbService: Sequelize) => {
  const model = dbService.define(
    TABLE_NAME,
    attributes
  ) as NotificationGroupsModel;

  model.associate = function (models) {
    models.NotificationGroup.hasMany(models.NotificationTopic, {
      foreignKey: "groupId",
      as: GROUP_TO_TOPIC,
      onDelete: "cascade",
    });
  };
  return model;
};
