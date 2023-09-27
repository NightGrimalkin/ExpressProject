const express = require("express");
const loginRouter = express.Router();
const loginAuthRouter = express.Router();
const db = require("../../mysql/dbConnection");
const bcrypt = require("bcrypt");

const sql = "Select * from users where username = ? ";

loginRouter.get("/login", (req, res) => {
  res.render("./login.ejs");
});

loginRouter.use(loginAuthRouter);

loginAuthRouter.post("/login/auth", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    db.query(sql, [username, password], (err, data) => {
      if (err) {
        throw err;
      }
      if (data.length > 0) {
        const comparsion = bcrypt.compareSync(password, data[0].password);
        if (comparsion) {
          req.session.logged_in = true;
          req.session.username = data[0].username;
          res.cookie("last_login", Date.now(), { maxAge: 900000 });
          res.redirect("/");
        } else {
          res.send("<h1>Złe hasło<a href='/login'>LOGOWANIE</a></h1>");
        }
      } else {
        res.send(
          "<h1>Zła nazwa użytkownika<a href='/login'>LOGOWANIE</a></h1>"
        );
      }
    });
  }
});

module.exports = loginRouter;
