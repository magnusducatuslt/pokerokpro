import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

export interface User extends Model {
  readonly id: string;
  name?: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  isActive: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type UserModel = ModelType<User>;

export const User = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(250) },
    username: { type: DataTypes.STRING(250) },
    avatar: { type: DataTypes.STRING(250) },
    email: { type: DataTypes.STRING(250) },
    password: { type: DataTypes.STRING(250) },
  };

  const model = dbService.define("user", attributes) as UserModel;

  model.associate = function (models) {
    // TODO associate to account
  };

  return model;
};
