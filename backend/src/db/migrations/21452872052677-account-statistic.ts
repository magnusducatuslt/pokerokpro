
import { QueryInterface } from "sequelize";
import { db } from "../index";

module.exports = {
  async up(queryInterface: QueryInterface) {
    const transaction = await db.sequelize.transaction();

    try {
      await queryInterface.sequelize.query(
      `CREATE TABLE "public"."account_statistics" (
          "id" int8 NOT NULL,
          "account_id" uuid NOT NULL,
          "is_won" bool NOT NULL DEFAULT false,
          "balance_buyin" decimal(2) NOT NULL,
          "balance_buyout" varchar(255) NOT NULL,
          "date" timestamp NOT NULL,
          PRIMARY KEY ("id"),
          CONSTRAINT "account_statistic_accountIdFk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts" ("id")
        );`,
        { transaction: transaction },
      )

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
