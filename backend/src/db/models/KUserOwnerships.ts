import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

export interface KUserOwnership extends Model {
  readonly id: string;

  fileMetaId: string;
  ownerId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type KUserOwnershipModel = ModelType<KUserOwnership>;

export const KUserOwnership = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    fileMetaId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define(
    "kuserOwnerships",
    attributes
  ) as KUserOwnershipModel;

  model.associate = function (models) {
    models.KUserOwnership.belongsTo(models.KUser, {
      foreignKey: "ownerId",
      targetKey: "id",
      as: "kuserOwnershipKuser",
      onDelete: "cascade",
    });
    models.KUserOwnership.belongsTo(models.FileMeta, {
      foreignKey: "fileMetaId",
      targetKey: "id",
      as: "kuserOwnershipFileMeta",
      onDelete: "cascade",
    });
  };

  return model;
};
