import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

export const NOTIFICATION_SUBSCRIPTION_TO_TOPIC =
  "notificationSubscriptionsToTopic";

export const NOTIFICATION_SUBSCRIPTIONS_TO_EMPLOYEE =
  "notificationSubscriptionsToEmployee";

export const NOTIFICATION_SUBSCRIPTIONS_TO_WEBHOOK =
  "notificationSubscriptionToWebhook";

export const TABLE_NAME = "notificationSubscriptions";

export type NotificationChannelsType = {
  byEmail: boolean;
  byWebhook: boolean;
  byPush: boolean;
  bySystem: boolean;
};

export type NotificationSubscription = {
  readonly id: string;

  employeeId: string;
  topicId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
} & NotificationChannelsType;

export interface NotificationSubscriptionI
  extends NotificationSubscription,
    Model {}

export type NotificationSubscriptionModel = ModelType<
  NotificationSubscriptionI
>;

export const attributes: Record<keyof NotificationSubscription, any> = {
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
    references: {
      model: "employees",
      key: "id",
    },
  },

  topicId: {
    type: DataTypes.STRING(250),
    allowNull: false,
    references: {
      model: "notificationTopics",
      key: "id",
    },
  },

  byEmail: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  byWebhook: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  byPush: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  bySystem: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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

export const NotificationSubscriptions = (dbService: Sequelize) => {
  const model = dbService.define(
    TABLE_NAME,
    attributes
  ) as NotificationSubscriptionModel;

  model.associate = function (models) {
    models.NotificationSubscription.belongsTo(models.NotificationTopic, {
      foreignKey: "topicId",
      targetKey: "id",
      as: NOTIFICATION_SUBSCRIPTION_TO_TOPIC,
    });
    models.NotificationSubscription.belongsTo(models.Employee, {
      foreignKey: "employeeId",
      targetKey: "id",
      as: NOTIFICATION_SUBSCRIPTIONS_TO_EMPLOYEE,
    });
    models.NotificationSubscription.belongsToMany(models.Webhook, {
      through: models.NotificationWebhook,
      foreignKey: "subscriptionId",
      targetKey: "id",
      as: NOTIFICATION_SUBSCRIPTIONS_TO_WEBHOOK,
      onDelete: "cascade",
    });
  };
  return model;
};
