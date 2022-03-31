import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

export interface Privilege extends Model {
  readonly id: string;

  roleId: string;
  permissionId: string;
  isArchived: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type PrivilegeModel = ModelType<Privilege>;

export const Privilege = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    roleId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    permissionId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    isArchived: { type: DataTypes.BOOLEAN, defaultValue: false },
  };

  const model = dbService.define("privileges", attributes) as PrivilegeModel;

  model.associate = function (models) {
    models.Privilege.belongsTo(models.Role, {
      foreignKey: "roleId",
      targetKey: "id",
      as: "privilegesToRoles",
      onDelete: "cascade",
    });
    models.Privilege.belongsTo(models.Permission, {
      foreignKey: "permissionId",
      targetKey: "id",
      as: "privilegesToPermissions",
      onDelete: "cascade",
    });
  };

  return model;
};
