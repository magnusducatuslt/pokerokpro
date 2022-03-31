import path from "path";
import fs from "fs";

const now = Date.now() * 13;
const name = process.argv.slice(2).shift();

const migrationName = `src/db-v2/migrations/common/${now}-${name}.ts`;
const migrationPath = path.resolve(process.cwd(), migrationName);

const command = `
import { QueryInterface } from "sequelize";
import { db } from "@core/db";

module.exports = {
  async up(queryInterface: QueryInterface) {
    const transaction = await db.sequelize.transaction();

    try {
      // YOUR MIGRATION UP

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
`;

fs.writeFileSync(migrationPath, command);

console.log(`Sequelize migration ${migrationName} skeleton has been created!`);
