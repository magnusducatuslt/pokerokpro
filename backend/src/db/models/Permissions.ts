import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { Role } from "./Roles";

export interface Permission extends Model {
  readonly id: string;

  name: string;
  type: string;
  permissionToRole: Role[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type PermissionModel = ModelType<Permission>;

export const Permission = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(250) },
    type: { type: DataTypes.STRING(250) },
  };

  const model = dbService.define("permissions", attributes) as PermissionModel;

  model.associate = function (models) {
    models.Permission.belongsToMany(models.Role, {
      through: models.Privilege,
      foreignKey: "permissionId",
      targetKey: "id",
      as: "permissionToRole",
      onDelete: "cascade",
    });
  };

  return model;
};
