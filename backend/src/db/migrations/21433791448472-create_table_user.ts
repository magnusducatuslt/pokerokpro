
import { QueryInterface, DataTypes } from "sequelize";
import { db } from "../index";
import {TABLE_NAME as TABLE_NAME_USER} from "../models/User";

module.exports = {
  async up(queryInterface: QueryInterface) {
    const transaction = await db.sequelize.transaction();

    try {
      await queryInterface.createTable(TABLE_NAME_USER,{
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
      },{transaction})

      return await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
  async down(queryInterface: QueryInterface) {
    const transaction = await db.sequelize.transaction();

    try {
      // YOUR MIGRATION DOWN

      return await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
