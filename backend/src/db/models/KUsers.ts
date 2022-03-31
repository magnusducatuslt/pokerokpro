import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { FileMeta } from "./FileMetas";
import { Company } from "./Companies";

export interface KUser extends Model {
  readonly id: string;

  name?: string;
  username: string;
  position: string;
  country: string;
  city: string;
  phone: string;
  language: string;
  avatar: string;
  email: string;
  password: string;
  other: string;
  isActive: boolean;
  isArchived: boolean;
  kuserFileMeta: FileMeta[];
  kuserCompany: Company[];
  description: string;
  address: string;
  skype: string;
  whatsapp: string;
  telegram: string;
  facebook: string;
  linkedin: string;
  twitter: string;
  portfolio: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type KUserModel = ModelType<KUser>;

export const KUser = (dbService: Sequelize) => {
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
    position: { type: DataTypes.STRING(250) },
    country: { type: DataTypes.STRING(250) },
    city: { type: DataTypes.STRING(250) },
    phone: { type: DataTypes.STRING(250) },
    language: { type: DataTypes.STRING(250) },
    avatar: { type: DataTypes.STRING(250) },
    email: { type: DataTypes.STRING(250) },
    password: { type: DataTypes.STRING(250) },
    other: { type: DataTypes.STRING(250) },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
    isArchived: { type: DataTypes.BOOLEAN, defaultValue: false },
    description: { type: DataTypes.TEXT },
    address: { type: DataTypes.STRING(250) },
    skype: { type: DataTypes.STRING(250) },
    whatsapp: { type: DataTypes.STRING(250) },
    telegram: { type: DataTypes.STRING(250) },
    facebook: { type: DataTypes.STRING(250) },
    linkedin: { type: DataTypes.STRING(250) },
    twitter: { type: DataTypes.STRING(250) },
    portfolio: { type: DataTypes.STRING(250) },
  };

  const model = dbService.define("kusers", attributes) as KUserModel;

  model.associate = function (models) {
    models.KUser.belongsToMany(models.FileMeta, {
      through: models.KUserOwnership,
      foreignKey: "ownerId",
      targetKey: "id",
      as: "kuserFileMeta",
      onDelete: "cascade",
    });
    // models.KUser.hasOne(models.FileMeta, {
    //   foreignKey: "createrId",
    //   as: "kuserCreaterId",
    //   onDelete: "cascade",
    // });
    models.KUser.belongsToMany(models.Company, {
      through: models.Employee,
      foreignKey: "kuserId",
      targetKey: "id",
      as: "kuserCompany",
      onDelete: "cascade",
    });
    models.KUser.hasMany(models.Employee, {
      foreignKey: "kuserId",
      as: "kuserToEmployee",
      onDelete: "cascade",
    });
    // models.KUser.hasMany(models.HistoryEmail, {
    //   foreignKey: "kuserId",
    //   as: "kuserToHistoryEmail",
    //   onDelete: "cascade",
    // });
  };

  return model;
};
