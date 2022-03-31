import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface EmployeeTag extends Model {
  readonly id: string;

  tagId: string;
  employeeId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type EmployeeTagModel = ModelType<EmployeeTag>;

export const EmployeeTag = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    tagId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define(
    "employeeTags",
    attributes
  ) as EmployeeTagModel;

  model.associate = function (models) {
    models.EmployeeTag.belongsTo(models.Tag, {
      foreignKey: "tagId",
      targetKey: "id",
      as: "employeeTagsToTags",
      onDelete: "cascade",
    });
    models.EmployeeTag.belongsTo(models.Employee, {
      foreignKey: "employeeId",
      targetKey: "id",
      as: "employeeTagsToEmployees",
      onDelete: "cascade",
    });
  };

  return model;
};
