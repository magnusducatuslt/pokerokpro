const path = require("path");
const { db } = require(path.resolve(process.cwd(), "dist/src/db/index.js"));
const { config } = require(path.resolve(
  process.cwd(),
  "dist/src/config/config.js"
));
const env = config.env;

async function clearDB(sequelize, environment) {
  try {
    await sequelize.query("DROP SCHEMA public CASCADE");
    console.log("schema dropped");
    await sequelize.query("CREATE SCHEMA public");
    console.log("schema created");
    return await sequelize.close();
  } catch (e) {
    console.log(e.message);
    await sequelize.close();
    process.exit(1);
  }
}
if (env.match(/prod/gi) || env.match(/stag/gi) || env.match(/dev/gi)) {
  console.log("Abort only for local env");
  process.exit(1);
}

clearDB(db.sequelize, env).then(() => console.log("db cleared"));
