
import { QueryInterface } from "sequelize";
import { db } from "../index";

module.exports = {
  async up(queryInterface: QueryInterface) {
    const transaction = await db.sequelize.transaction();

    try {
      await queryInterface.sequelize.query(`
        CREATE TABLE "public"."users" (
          "id" uuid NOT NULL,
          "name" varchar(255) DEFAULT NULL,
          "username" varchar(255) NOT NULL,
          "email" varchar(255) DEFAULT NULL,
          "password" varchar(255) NOT NULL,
          "avatar" varchar(255),
          "is_active" bool NOT NULL DEFAULT true,
          "registered_at" date NOT NULL,
          PRIMARY KEY ("id"),
          CONSTRAINT "username_uniq" UNIQUE ("username"),
          CONSTRAINT "user_email_uniq" UNIQUE ("username", "email")
        );
        
        ALTER TABLE "public"."users" 
          OWNER TO "user";
        
        CREATE UNIQUE INDEX "username_uniq_idx" ON "public"."users" (
          "username"
        );
        
        CREATE UNIQUE INDEX "email_uniq" ON "public"."users" (
          "email"
        );
      `, {transaction: transaction})
      await queryInterface.sequelize.query(`
        CREATE TABLE "public"."accounts" (
          "id" uuid NOT NULL,
          "account_name" varchar(255) NOT NULL,
          "account_id" varchar(255) NOT NULL,
          "user_id" uuid NOT NULL,
          "platform" varchar(5) NOT NULL,
          "balance" int4,
          "position" int4,
          "status" varchar(50),
          "is_active" bool NOT NULL DEFAULT true,
          "game" varchar(255) NOT NULL,
          "pub_key" varchar(255),
          PRIMARY KEY ("id"),
          CONSTRAINT "account_fkUserId" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id"),
          CONSTRAINT "accounts_unique_constraint" UNIQUE ("account_id", "platform") WITH (fillfactor=10),
          CONSTRAINT "account_position" CHECK (position > 0)
        );
        
        CREATE UNIQUE INDEX "account_uniq" ON "public"."accounts" USING btree (
          "account_id",
          "platform"
        ) WITH (FILLFACTOR = 10);`,
          {transaction: transaction}
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
