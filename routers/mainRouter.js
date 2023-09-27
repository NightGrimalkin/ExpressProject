const express = require("express");
const mainRouter = express.Router();

const loginRouter=require('./subrouters/loginRouter');
const registrationRouter=require('./subrouters/registrationRouter');
const subpageRouter=require('./subrouters/subpagerouter');

mainRouter.get("/", (req, res) => {
  res.render("./index.ejs");
});

mainRouter.use(loginRouter);
mainRouter.use(registrationRouter);
mainRouter.use(subpageRouter);

module.exports =  mainRouter ;
