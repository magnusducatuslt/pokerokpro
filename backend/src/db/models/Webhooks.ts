import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

export const WEBHOOKS_TO_EMPLOYEE = "webhookEmployee";

export const WEBHOOK_TO_NOTIFICATION_SUBSCRIPTIONS =
  "webhookToNotificationSubscription";

export const TABLE_NAME = "webhooks";

export type Webhook = {
  readonly id: string;

  name: string;
  token: string;
  url: string;
  employeeId: string;
  isArchived: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export interface WebhookI extends Webhook, Model {}

export type WebhookModel = ModelType<WebhookI>;

export const attributes: Record<keyof Webhook, any> = {
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

  url: { type: DataTypes.STRING(250) },
  name: { type: DataTypes.STRING(250) },

  token: { type: DataTypes.STRING(250), defaultValue: DataTypes.UUIDV4 },

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

export const Webhooks = (dbService: Sequelize) => {
  const model = dbService.define(TABLE_NAME, attributes) as WebhookModel;

  model.associate = function (models) {
    models.Webhook.belongsTo(models.Employee, {
      foreignKey: "employeeId",
      targetKey: "id",
      as: WEBHOOKS_TO_EMPLOYEE,
    });
    models.Webhook.belongsToMany(models.NotificationSubscription, {
      through: models.NotificationWebhook,
      foreignKey: "webhookId",
      targetKey: "id",
      as: WEBHOOK_TO_NOTIFICATION_SUBSCRIPTIONS,
      onDelete: "cascade",
    });
  };
  return model;
};
