import { Sequelize } from "sequelize";

const DEFAULT_PG_USERNAME = "username";
const DEFAULT_PG_PASSWORD = "mysecretpassword";

export const sequelize = new Sequelize(
  "database",
  process.env.PG_USERNAME ?? DEFAULT_PG_USERNAME,
  process.env.PG_PASSWORD ?? DEFAULT_PG_PASSWORD,
  { host: "localhost", dialect: "postgres" },
);

try {
  console.log("Trying to authenticate");
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
