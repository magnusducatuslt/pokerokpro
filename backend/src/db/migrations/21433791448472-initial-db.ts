
import { QueryInterface } from "sequelize";
import { db } from "../index";

module.exports = {
  async up(queryInterface: QueryInterface) {
    const transaction = await db.sequelize.transaction();

    try {
      // await queryInterface.sequelize.query(`
      //   CREATE DATABASE "total-poker"
      //     WITH
      //     OWNER = "user"
      //     ENCODING = 'UTF8'
      //     LC_COLLATE = 'en_US.utf8'
      //     LC_CTYPE = 'en_US.utf8'
      //     TABLESPACE = pg_default
      //     CONNECTION LIMIT = -1;
      // `)
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
          CONSTRAINT "uemail" UNIQUE ("username", "email")
        );
        
        ALTER TABLE "public"."users" 
          OWNER TO "user";
        
        CREATE UNIQUE INDEX "username_uniq_idx" ON "public"."users" (
          "username"
        );
        
        CREATE UNIQUE INDEX "email_uniq" ON "public"."users" (
          "email"
        );
      `)

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
