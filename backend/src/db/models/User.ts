import { Sequelize, Model, DataTypes, Optional,ModelAttributes } from "sequelize";
import { ModelType } from "../ModelType";


export const TABLE_NAME = "users";

interface UserAttributes {
  readonly id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  isActive: boolean;

  readonly registeredAt: Date;
}

//define attributes which be attr?:value in typescript definition 
interface UserCreationAttributes extends Optional<UserAttributes, "id" | "registeredAt"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export type UserModel = ModelType<UserInstance>;

export const User = (dbService: Sequelize) => {
  const attributes:ModelAttributes<UserInstance,UserAttributes> = {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(250), allowNull: true },
    username: { type: DataTypes.STRING(250), unique: true, allowNull: false, key: 'username_uniq' },
    avatar: { type: DataTypes.STRING(250) , allowNull: true},
    email: { type: DataTypes.STRING(250), unique: true, validate: {isEmail: true} },
    password: { type: DataTypes.STRING(250) },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
    registeredAt: { type: DataTypes.DATE, defaultValue: new Date(), allowNull: false },
  };

  const model = dbService.define(TABLE_NAME, attributes) as UserModel;

  model.associate = function (models) {
    models.User.hasMany(models.Account, {
      foreignKey: "userId",
      as: 'userAccounts',
    });
  };

  return model;
};
