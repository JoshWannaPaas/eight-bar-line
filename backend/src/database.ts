import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Default values for local dev environment
const DEFAULT_PG_DATABASE = "eight_bar_line_db";
const DEFAULT_PG_USERNAME = "user";
const DEFAULT_PG_PASSWORD = "mysecretpassword";
const DEFAULT_PG_HOST = "localhost";
const DEFAULT_PG_PORT = "5432";

// Connect to the Database
console.log(
  "Connecting to Database: ",
  process.env.POSTGRESQL_ADDON_DB ?? DEFAULT_PG_DATABASE,
);
export const sequelize = new Sequelize(
  process.env.POSTGRESQL_ADDON_DB ?? DEFAULT_PG_DATABASE,
  process.env.POSTGRESQL_ADDON_USER ?? DEFAULT_PG_USERNAME,
  process.env.POSTGRESQL_ADDON_PASSWORD ?? DEFAULT_PG_PASSWORD,
  {
    host: process.env.POSTGRESQL_ADDON_HOST ?? DEFAULT_PG_HOST,
    port: parseInt(process.env.POSTGRESQL_ADDON_PORT ?? DEFAULT_PG_PORT, 10),
    dialect: "postgres",
    logging: false,
  },
);

try {
  await sequelize.authenticate();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
