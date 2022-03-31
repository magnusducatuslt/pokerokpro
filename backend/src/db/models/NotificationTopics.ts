import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

export const NOTIFICATION_TOPIC_TO_GROUP = "notificationTopicToGroup";
const NOTIFICATION_TOPIC_TO_SUBSCRIPTIONS = "notificationTopicToSubscriptions";

export const TABLE_NAME = "notificationTopics";

export type NotificationTopicRecipientsFilter = {
  roles: string[];
  permissions: string[];
};

export type NotificationTopic = {
  readonly id: string;

  name: string;
  groupId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
} & NotificationTopicRecipientsFilter;

export interface NotificationTopicI extends NotificationTopic, Model {}

export type NotificationTopicsModel = ModelType<NotificationTopicI>;

export const attributes: Record<keyof NotificationTopic, any> = {
  id: {
    type: DataTypes.STRING(250),
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: { type: DataTypes.STRING(250) },
  groupId: {
    type: DataTypes.STRING(250),
    allowNull: false,
    references: {
      model: "notificationGroups",
      key: "id",
    },
  },
  roles: { type: DataTypes.ARRAY(DataTypes.STRING(250)) },
  permissions: { type: DataTypes.ARRAY(DataTypes.STRING(250)) },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
};

export const NotificationTopics = (dbService: Sequelize) => {
  const model = dbService.define(
    TABLE_NAME,
    attributes
  ) as NotificationTopicsModel;

  model.associate = function (models) {
    models.NotificationTopic.belongsTo(models.NotificationGroup, {
      foreignKey: "groupId",
      targetKey: "id",
      as: NOTIFICATION_TOPIC_TO_GROUP,
      onDelete: "cascade",
    });
    models.NotificationTopic.hasMany(models.NotificationSubscription, {
      foreignKey: "topicId",
      as: NOTIFICATION_TOPIC_TO_SUBSCRIPTIONS,
    });
  };
  return model;
};
