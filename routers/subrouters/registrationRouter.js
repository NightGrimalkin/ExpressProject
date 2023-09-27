const express = require("express");
const registrationRouter = express.Router();
const registrationAuthRouter = express.Router();
const db = require("../../mysql/dbConnection");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const sql = "SELECT * FROM users WHERE username = ?";

registrationRouter.get("/registration", (req, res) => {
  res.render("./registration.ejs");
});

registrationRouter.use(registrationAuthRouter);

registrationAuthRouter.post("/registration/auth", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const hash = bcrypt.hashSync(password, saltRounds);
  db.query(sql, [username], (err, data) => {
    if (err) throw err;
    if (data.length > 0) {
      res.send(
        "<h1>Uzytkownik juz istnieje <a href='/registration'>REJESTRACJA</a></h1>"
      );
    } else {
      const sql = "INSERT INTO users(id,username,password) values (0,?,?)";
      db.query(sql, [username, hash], (err, data) => {
        if (err) throw err;
        res.redirect("/login");
      });
    }
  });
});

module.exports = registrationRouter;
