import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface UserTag extends Model {
  readonly id: string;

  tagId: string;
  userId: string;
  status: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type UserTagModel = ModelType<UserTag>;

export const UserTag = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    tagId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    status: { type: DataTypes.BOOLEAN },
  };

  const model = dbService.define("userTags", attributes) as UserTagModel;

  return model;
};
