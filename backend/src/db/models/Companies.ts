import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { KUser } from "./KUsers";
import { FileMeta } from "./FileMetas";
import { Project } from "./Projects";
import { CurrencyEnum } from "@core/models";

export const TABLE_NAME = "companies";

type Brand = {
  theme: { [key: string]: any };
  schemas: { [key: string]: any };
};
export interface CompanyRelationsI {
  companyKuser: KUser[];
  companyFileMeta: FileMeta[];
  companyProject: Project[];
}

export interface Company extends CompanyRelationsI, Model {
  readonly id: string;

  name: string;
  logo: string;
  ownerId: string;
  color: string;
  isConstractor: string;
  legalId: string;
  contracts: string;
  description: string;
  isArchived: boolean;

  createdBy: string;
  phone: string;
  domainName: string;
  email: string;
  currency: CurrencyEnum;
  brand: Brand;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type CompanyModel = ModelType<Company>;

export const Company = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(250) },
    logo: { type: DataTypes.STRING(250) },
    ownerId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    color: { type: DataTypes.STRING(250) },
    isConstractor: { type: DataTypes.STRING(250) },
    legalId: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    contracts: { type: DataTypes.STRING(250) },
    description: { type: DataTypes.TEXT, allowNull: true },
    isArchived: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdBy: { type: DataTypes.STRING(250) },
    phone: { type: DataTypes.STRING(250) },
    domainName: { type: DataTypes.STRING(250) },
    email: { type: DataTypes.STRING(250) },
    currency: {
      type: DataTypes.ENUM,
      values: ["USD", "EUR", "RUB", "CNY", "BYN"],
      defaultValue: "RUB",
    },
    brand: {
      type: DataTypes.JSONB,
      allowNull: true,
      set(value: any) {
        this.setDataValue("brand", value ? value : {});
      },
      get() {
        const rawValue = this.getDataValue("brand");
        return rawValue ? rawValue : {};
      },
    },
  };

  const model = dbService.define(TABLE_NAME, attributes) as CompanyModel;

  model.associate = function (models) {
    models.Company.belongsToMany(models.KUser, {
      through: models.Employee,
      foreignKey: "companyId",
      targetKey: "id",
      as: "companyKuser",
      onDelete: "cascade",
    });
    models.Company.hasMany(models.Employee, {
      foreignKey: "companyId",
      as: "directCompanyEmployee",
      onDelete: "cascade",
    });
    models.Company.hasMany(models.Project, {
      foreignKey: "companyId",
      as: "companyProject",
      onDelete: "cascade",
    });
    models.Company.belongsToMany(models.FileMeta, {
      through: models.CompanyOwnership,
      foreignKey: "companyId",
      targetKey: "id",
      as: "companyFileMeta",
      onDelete: "cascade",
    });
  };
  return model;
};
