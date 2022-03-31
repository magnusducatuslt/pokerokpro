import path from "path";
import fs from "fs";

const now = Date.now() * 13;
const name = process.argv.slice(2).shift();

const seedName = `src/db-v2/seeders/common/${now}-${name}.ts`;
const seedPath = path.resolve(process.cwd(), seedName);

const command = `
import { QueryInterface } from "sequelize";
import { db } from "@core/db";

module.exports = {
  async up(queryInterface: QueryInterface) {
    const transaction = await db.sequelize.transaction();

    try {
      // YOUR SEED UP

      return await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
  async down(queryInterface: QueryInterface) {
    const transaction = await db.sequelize.transaction();

    try {
      // YOUR SEED DOWN

      return await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  },
};
`;

fs.writeFileSync(seedPath, command);

console.log(`Sequelize seed ${seedName} skeleton has been created!`);
