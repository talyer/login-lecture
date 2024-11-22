"user strict";

const express = require("express");
//const bodyParser = require("body-parser");  현재 body-parser는 express에 포함되어서? express로 사용하면 됨
const app = express();

// 라우팅
const home = require("./src/routes/home");


// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());

// URL를 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결 하는 코드
app.use(express.urlencoded({ extended: true }));


app.use("/", home); // use -> 미들웨어를 등록해주는 메서드

module.exports = app;
