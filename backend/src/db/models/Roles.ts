import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { Permission } from "./Permissions";

export interface Role extends Model {
  readonly id: string;

  name: string;
  description: string;
  companyId: string;
  isRemovable: boolean;
  isDefault: boolean;
  isArchived: boolean;
  roleToPermission: Permission[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type RoleModel = ModelType<Role>;

export const Role = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(250) },
    description: { type: DataTypes.TEXT },
    companyId: { type: DataTypes.STRING(), allowNull: false },
    isRemovable: { type: DataTypes.BOOLEAN, defaultValue: true },
    isDefault: { type: DataTypes.BOOLEAN, defaultValue: false },
    isArchived: { type: DataTypes.BOOLEAN, defaultValue: false },
  };

  const model = dbService.define("roles", attributes) as RoleModel;

  model.associate = function (models) {
    models.Role.belongsToMany(models.Permission, {
      through: models.Privilege,
      foreignKey: "roleId",
      targetKey: "id",
      as: "roleToPermission",
      onDelete: "cascade",
    });
    models.Role.hasMany(models.Employee, {
      foreignKey: "roleId",
      as: "roleToEmployees",
    });
    models.Role.belongsTo(models.Company, {
      foreignKey: "companyId",
      targetKey: "id",
    });
  };

  return model;
};
