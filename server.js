const express = require("express");
const path = require("path");
const templateEngine = require("./20488.js");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/movies", async (req, res) => {
  const data = { a: 5, x: 2 };

  const template = "20488{a} và 20488{if x == 1}";

  const output = templateEngine.render(template, data);
  res.send(output);
});

app.get("/", (req, res) => {
  res.redirect("/movies");
});

const PORT = process.env.PORT || 20488;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
