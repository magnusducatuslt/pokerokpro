
import { QueryInterface, DataTypes } from "sequelize";
import { db } from "../index";
import {TABLE_NAME as TABLE_NAME_ACCOUNT} from "../models/Account";

module.exports = {
  async up(queryInterface: QueryInterface) {
    const transaction = await db.sequelize.transaction();

    try {
      
      await queryInterface.createTable(TABLE_NAME_ACCOUNT,{
        id: {
          type: DataTypes.STRING(250),
          defaultValue: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        accountName: { type: DataTypes.STRING(250), unique: true, allowNull: false, key: 'username_uniq' },
        userId: {
          type: DataTypes.STRING(250),
          allowNull: false,
        },
        accountId: { type: DataTypes.STRING(250), allowNull: false },
        platform: {
          type: DataTypes.STRING(3),
          allowNull: false,
        },
        status: { type: DataTypes.STRING(250) },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
        games: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
        balance: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
        position: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
        pubKey: { type: DataTypes.STRING(250) },
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
