import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { FileMeta } from "./FileMetas";

export interface TemplateOwnership extends Model {
  readonly id: string;

  templateId: string;
  fileMetaId: string;

  templateOwnershipsProject?: FileMeta;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type TemplateOwnershipModel = ModelType<TemplateOwnership>;

export const TemplateOwnership = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    templateId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    fileMetaId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define(
    "templateOwnerships",
    attributes
  ) as TemplateOwnershipModel;

  model.associate = function (models) {
    // associations can be defined here
    models.TemplateOwnership.belongsTo(models.EditorTemplate, {
      foreignKey: "templateId",
      targetKey: "id",
      as: "templateOwnershipsProject",
      onDelete: "cascade",
    });
    models.TemplateOwnership.belongsTo(models.FileMeta, {
      foreignKey: "fileMetaId",
      targetKey: "id",
      as: "templateOwnershipsTemplateFileMeta",
      onDelete: "cascade",
    });
  };
  return model;
};
