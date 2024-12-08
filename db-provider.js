const pgp = require("pg-promise")();

export const db = pgp({
  host: process.env.Host,
  port: process.env.Port,
  database: process.env.Schema,
  user: process.env.Username,
  password: process.env.Password,
  ssl: false,
});
