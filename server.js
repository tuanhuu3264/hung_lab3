const express = require("express");
const pgp = require("pg-promise")();
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const db = pgp(process.env.DB_CONNECTION);

app.set("view engine", "ejs"); 

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
