import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { FileMeta } from "./FileMetas";

export interface File extends Model {
  readonly id: string;

  metaId: string;
  origin: string;
  path: string;
  ext: string;
  size: number;
  width: number;
  height: number;
  type: string;
  isArchived: boolean;
  fileFilesMetas?: FileMeta;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type FileModel = ModelType<File>;

export const File = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    metaId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    origin: { type: DataTypes.STRING(250) },
    type: { type: DataTypes.STRING(250) },
    path: { type: DataTypes.STRING(250) },
    ext: { type: DataTypes.STRING(250) },
    size: { type: DataTypes.INTEGER },
    width: { type: DataTypes.INTEGER, allowNull: true },
    height: { type: DataTypes.INTEGER, allowNull: true },
    isArchived: { type: DataTypes.BOOLEAN, defaultValue: false },
  };

  const model = dbService.define("files", attributes) as FileModel;

  model.associate = function (models) {
    return models.File.belongsTo(models.FileMeta, {
      foreignKey: "metaId",
      targetKey: "id",
      as: "fileFilesMetas",
      onDelete: "cascade",
    });
  };
  return model;
};
