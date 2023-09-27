const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const db = require("./mysql/dbConnection");
const PORT = 3000;

const mainRouter = require("./routers/mainRouter");

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/templates");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(
  session({
    secret: "secret_key",
    resave: true,
    saveUninitialized: true,
    cookie: {
      expires: 1000 * 60 * 60,
      httpOnly: true,
      path: "/",
    },
  })
);

app.use(mainRouter);

sql1 =
  "CREATE DATABASE IF NOT EXISTS `users` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;";
sql2 = "USE `users`";
sql3 =
  "CREATE TABLE IF NOT EXISTS `users` (`id` int(10) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,`username` varchar(128),`password` varchar(1024))";

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log("Error: ", err.message);
    return;
  }
  db.query(sql1, (err, data) => {
    if (err) throw err;
  });
  db.query(sql2, (err, data) => {
    if (err) throw err;
  });
  db.query(sql3, (err, data) => {
    if (err) throw err;
  });
});
