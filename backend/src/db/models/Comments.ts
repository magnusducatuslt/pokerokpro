import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface Comment extends Model {
  readonly id: string;

  message: string;
  ownerId: string;
  parentId: string;
  entityType: string;
  entityId: string;
  statusValue: string;
  isArhived: boolean;
  blockId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type CommentModel = ModelType<Comment>;

export const Comment = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    message: { type: DataTypes.STRING(250) },
    ownerId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    parentId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    entityType: { type: DataTypes.STRING(250) },
    entityId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    statusValue: { type: DataTypes.STRING(250) },
    isArhived: { type: DataTypes.BOOLEAN },
    blockId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define("comments", attributes) as CommentModel;

  return model;
};
