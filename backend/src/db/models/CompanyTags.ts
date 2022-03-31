import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface CompanyTag extends Model {
  readonly id: string;

  companyId: string;
  tagId: string;
  status: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type CompanyTagModel = ModelType<CompanyTag>;

export const CompanyTag = (dbService: Sequelize) => {
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
    tagId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    status: { type: DataTypes.BOOLEAN },
  };

  const model = dbService.define("companyTags", attributes) as CompanyTagModel;

  return model;
};
