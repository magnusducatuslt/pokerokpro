import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { Project } from "./Projects";
import { Tag } from "./Tags";
import { KUser } from "./KUsers";
import { Company } from "./Companies";
import { Role } from "./Roles";
import { Task } from "./Tasks";

export const EMPLOYEE_TO_NOTIFICATION_SUBSCRIPTION =
  "employeeToNotificationSubscriptions";

export const EMPLOYEE_TO_WEBHOOKS = "employeeToWebhook";
export interface Employee extends Model {
  readonly id: string;

  isActive: boolean;
  isArchived: boolean;
  kuserId: string;
  companyId: string;
  roleId: string;
  employeeKuser: KUser;
  employeesToProject: Project[];
  employeeToTags: Tag[];
  employeeCompany: Company;
  employeesToRole: Role;
  employeeToTaskById: Task[];
  tags: string[];
  description: string;
  language: string;
  status: string;
  registrated: Date;
  edited: Date;
  position: string;
  companyPhone: string;
  phone: string;
  address: string;
  email: string;
  skype: string;
  whatsapp: string;
  telegram: string;
  facebook: string;
  linkedin: string;
  twitter: string;
  portfolio: string;
  avatar: string;
  name: string;
  username: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type EmployeeModel = ModelType<Employee>;

export const Employee = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    isArchived: { type: DataTypes.BOOLEAN, defaultValue: false },
    roleId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    kuserId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    tags: { type: DataTypes.ARRAY(DataTypes.TEXT) },
    companyId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    description: { type: DataTypes.TEXT },
    language: { type: DataTypes.STRING(250) },
    status: { type: DataTypes.STRING(250) },
    registrated: { type: DataTypes.DATE },
    edited: { type: DataTypes.DATE },
    position: { type: DataTypes.STRING(250) },
    companyPhone: { type: DataTypes.STRING(250) },
    phone: { type: DataTypes.STRING(250) },
    address: { type: DataTypes.STRING(250) },
    email: { type: DataTypes.STRING(250) },
    skype: { type: DataTypes.STRING(250) },
    whatsapp: { type: DataTypes.STRING(250) },
    telegram: { type: DataTypes.STRING(250) },
    facebook: { type: DataTypes.STRING(250) },
    linkedin: { type: DataTypes.STRING(250) },
    twitter: { type: DataTypes.STRING(250) },
    portfolio: { type: DataTypes.STRING(250) },
    avatar: { type: DataTypes.STRING(250) },
    name: { type: DataTypes.STRING(250) },
    username: { type: DataTypes.STRING(250) },
  };

  const model = dbService.define("employees", attributes) as EmployeeModel;

  model.associate = function (models) {
    models.Employee.belongsTo(models.KUser, {
      foreignKey: "kuserId",
      targetKey: "id",
      as: "employeeKuser",
      onDelete: "cascade",
    });
    models.Employee.belongsTo(models.Company, {
      foreignKey: "companyId",
      targetKey: "id",
      as: "employeeCompany",
    });
    models.Employee.belongsToMany(models.Project, {
      through: models.Participant,
      foreignKey: "employeeId",
      targetKey: "id",
      as: "employeesToProject",
      onDelete: "cascade",
    });
    models.Employee.belongsTo(models.Role, {
      foreignKey: "roleId",
      targetKey: "id",
      as: "employeesToRole",
      onDelete: "cascade",
    });
    models.Employee.belongsToMany(models.Tag, {
      through: models.EmployeeTag,
      foreignKey: "employeeId",
      targetKey: "id",
      as: "employeeToTags",
      onDelete: "cascade",
    });
    models.Employee.hasMany(models.Task, {
      as: "employeeToTaskById",
      foreignKey: "employeeId",
    });
    models.Employee.hasMany(models.Task, {
      as: "employeeToTaskAssignedById",
      foreignKey: "assignedId",
    });
    models.Employee.hasMany(models.Task, {
      as: "employeeToTaskOwnerById",
      foreignKey: "ownerId",
    });
    models.Employee.hasMany(models.NotificationSubscription, {
      as: EMPLOYEE_TO_NOTIFICATION_SUBSCRIPTION,
      foreignKey: "employeeId",
    });
    models.Employee.hasMany(models.Webhook, {
      as: EMPLOYEE_TO_WEBHOOKS,
      foreignKey: "employeeId",
    });
  };
  return model;
};
