import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface CommentMarker extends Model {
  readonly id: string;

  markesId: string;
  commentId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type CommentMarkerModel = ModelType<CommentMarker>;

export const CommentMarker = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    markesId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    commentId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define(
    "commentMarkers",
    attributes
  ) as CommentMarkerModel;

  return model;
};
