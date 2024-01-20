import { Sequelize } from "sequelize";

const DEFAULT_PG_DATABASE = "eight_bar_line_db";
const DEFAULT_PG_USERNAME = "user";
const DEFAULT_PG_PASSWORD = "mysecretpassword";

export const sequelize = new Sequelize(
  process.env.PG_DATABASE ?? DEFAULT_PG_DATABASE,
  process.env.PG_USERNAME ?? DEFAULT_PG_USERNAME,
  process.env.PG_PASSWORD ?? DEFAULT_PG_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  },
);

try {
  await sequelize.authenticate();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
