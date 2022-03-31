import { config } from "../../../config/config"

const database = {
  database: config.postgres.config.database,
  host: config.postgres.config.domain,
  port: config.postgres.config.port,
  password: config.postgres.config.password,
  username: config.postgres.config.user,
  dialect: "postgres",
  logging: false,
  pool: {
    max: 15,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
};

// const withSSL = Object.assign(
//   {
//     ssl: true,
//     dialectOptions: {
//       ssl: {
//         ca: fs.readFileSync(
//           `${process.cwd()}/certificates/${
//             config.postgres.config.certificate
//           }.crt`
//         ),
//       },
//     },
//   },
//   database
// );

/* Sequelize uses CommonJS modules */
module.exports = {
  local: database,
  // development: withSSL,
};
