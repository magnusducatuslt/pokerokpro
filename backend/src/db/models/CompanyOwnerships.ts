import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { FileMeta } from "./FileMetas";

export interface CompanyOwnership extends Model {
  readonly id: string;

  companyId: string;
  fileMetaId: string;

  companyOwnershipsFileMeta?: FileMeta;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type CompanyOwnershipModel = ModelType<CompanyOwnership>;

export const CompanyOwnership = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    companyId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    fileMetaId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define(
    "companyOwnerships",
    attributes
  ) as CompanyOwnershipModel;

  model.associate = function (models) {
    models.CompanyOwnership.belongsTo(models.Company, {
      foreignKey: "companyId",
      targetKey: "id",
      as: "companyOwnerships",
      onDelete: "cascade",
    });
    models.CompanyOwnership.belongsTo(models.FileMeta, {
      foreignKey: "fileMetaId",
      targetKey: "id",
      as: "companyOwnershipsFileMeta",
      onDelete: "cascade",
    });
  };

  return model;
};
