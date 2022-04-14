import { Sequelize, Model, DataTypes, Optional,ModelAttributes } from "sequelize";
import { ModelType } from "../ModelType";
import {AccountInstance} from './Account'
import {User as UserEntity} from 'entities'

export const TABLE_NAME = "users";
export const USERS_HAS_MANY_ACCOUNTS = "accounts"

interface Relations {
  [USERS_HAS_MANY_ACCOUNTS]:AccountInstance
}
export interface UserAttributes extends Optional<UserEntity,"id"> {
  
}

//define attributes which be attr?:value in typescript definition 
interface UserCreationAttributes extends Optional<UserAttributes, "id"|"registeredAt"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes,Relations {}

export type UserModel = ModelType<UserInstance>;

export const User = (dbService: Sequelize) => {
  const attributes:ModelAttributes<UserInstance,UserAttributes> = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
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

  const model = dbService.define(TABLE_NAME, attributes,{timestamps:false}) as UserModel;

  model.associate = function (models) {
    models.User.hasMany(models.Account, {
      foreignKey: "userId",
      as: USERS_HAS_MANY_ACCOUNTS,
    });
  };

  return model;
};
