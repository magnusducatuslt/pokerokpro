import {
  Sequelize,
  Model,
  DataTypes,
  ModelAttributeColumnOptions,
} from "sequelize";
import { ModelType } from "../ModelType";

export const TABLE_NAME = "publicUrls";

export type PublicUrlT = {
  readonly id: string;

  url: string;
  shortUrl: string;
  isActive: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export interface PublicUrlI extends Model, PublicUrlT {}

export type PublicUrlModel = ModelType<PublicUrlI>;

export const attributes: Record<
  keyof PublicUrlT,
  ModelAttributeColumnOptions
> = {
  id: {
    type: DataTypes.STRING(250),
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },

  url: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },

  shortUrl: {
    type: DataTypes.STRING(250),
    allowNull: false,
    unique: true,
  },

  isActive: { type: DataTypes.BOOLEAN, defaultValue: false },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },

  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
};

export const PublicUrl = (dbService: Sequelize) => {
  const model = dbService.define(TABLE_NAME, attributes) as PublicUrlModel;

  return model;
};
