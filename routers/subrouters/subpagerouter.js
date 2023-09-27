const express = require("express");
const subPageRouter = express.Router();

subPageRouter.get("/*", (req, res, next) => {
  if (req.session.logged_in == true) {
    next();
  } else {
    res.redirect("/login");
  }
});

subPageRouter.get("/page1", (req, res) => {
  req.session.page1 == undefined
    ? (req.session.page1 = 1)
    : (req.session.page1 = req.session.page1 + 1);
  res.send("./subpage1.ejs");
});
subPageRouter.get("/page2", (req, res) => {
  req.session.page2 == undefined
    ? (req.session.page2 = 1)
    : (req.session.page2 = req.session.page2 + 1);
  res.send("./subpage2.ejs");
});
subPageRouter.get("/page3", (req, res) => {
  req.session.page3 == undefined
    ? (req.session.page3 = 1)
    : (req.session.page3 = req.session.page3 + 1);
  res.send("./subpage3.ejs");
});

module.exports = subPageRouter;
