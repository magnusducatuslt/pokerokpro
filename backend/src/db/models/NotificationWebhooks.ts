import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

const NOTIFICATION_WEBHOOK_TO_WEBHOOK = "NotificationWebhookToWebhook";

const NOTIFICATION_WEBHOOK_TO_NOTIFICATION_SUBSRIPTION =
  "notificationWebhookToNotificationSubscriptions";

export const TABLE_NAME = "notificationWebhooks";

export type NotificationWebhook = {
  readonly id: string;

  subscriptionId: string;
  webhookId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export interface NotificationWebhookI extends NotificationWebhook, Model {}

export type NotificationWebhookModel = ModelType<NotificationWebhookI>;

export const attributes: Record<keyof NotificationWebhook, any> = {
  id: {
    type: DataTypes.STRING(250),
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },

  subscriptionId: {
    type: DataTypes.STRING(250),
    allowNull: false,
    references: {
      model: "notificationSubscriptions",
      key: "id",
    },
  },

  webhookId: {
    type: DataTypes.STRING(250),
    allowNull: false,
    references: {
      model: "webhooks",
      key: "id",
    },
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

export const NotificationWebhooks = (dbService: Sequelize) => {
  const model = dbService.define(
    TABLE_NAME,
    attributes
  ) as NotificationWebhookModel;

  model.associate = function (models) {
    models.NotificationWebhook.belongsTo(models.NotificationSubscription, {
      foreignKey: "subscriptionId",
      targetKey: "id",
      as: NOTIFICATION_WEBHOOK_TO_NOTIFICATION_SUBSRIPTION,
    });
    models.NotificationWebhook.belongsTo(models.Webhook, {
      foreignKey: "webhookId",
      targetKey: "id",
      as: NOTIFICATION_WEBHOOK_TO_WEBHOOK,
    });
  };
  return model;
};
