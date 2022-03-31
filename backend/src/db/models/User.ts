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

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

//define attributes which be attr?:value in typescript definition 
interface UserCreationAttributes extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export type UserModel = ModelType<UserInstance>;

export const User = (dbService: Sequelize) => {
  const attributes:ModelAttributes<UserInstance,UserAttributes> = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(250) },
    username: { type: DataTypes.STRING(250) },
    avatar: { type: DataTypes.STRING(250) },
    email: { type: DataTypes.STRING(250) },
    password: { type: DataTypes.STRING(250) },
  };

  

  const model = dbService.define(TABLE_NAME, attributes) as UserModel;

  model.associate = function (models) {
    // TODO associate to account
  };

  return model;
};
