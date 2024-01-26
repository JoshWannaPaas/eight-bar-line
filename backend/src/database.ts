import { Sequelize } from "sequelize";

const DEFAULT_PG_DATABASE = "eight_bar_line_db";
const DEFAULT_PG_USERNAME = "user";
const DEFAULT_PG_PASSWORD = "mysecretpassword";

export const sequelize = new Sequelize(
  process.env.POSTGRES_DB ?? DEFAULT_PG_DATABASE,
  process.env.POSTGRES_USER ?? DEFAULT_PG_USERNAME,
  process.env.POSTGRES_PASSWORD ?? DEFAULT_PG_PASSWORD,
  {
    host: process.env.POSTGRES_HOST ?? "localhost",
    dialect: "postgres",
    logging: false,
  },
);

try {
  await sequelize.authenticate();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
