"user strict";

const express = require("express");
const app = express();
const home = require("./src/routes/home");



app.set("views", "./src/views");
app.set("view engine", "ejs");


app.use("/", home); // use -> 미들웨어를 등록해주는 메서드

module.exports = app;
