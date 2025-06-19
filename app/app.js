"user strict";

const express = require("express");

const session = require("express-session");

const cookieParser = require("cookie-parser");

const Memorystore = require("memorystore")(session)
//const bodyParser = require("body-parser");  현재 body-parser는 express에 포함되어서? express로 사용하면 됨
const path = require("path");
// const routes = require("../app/src/routes");
const bcrypt = require('bcrypt');


const app = express();

const fs = require("fs");  // 1
const uploadDir = "uploads"; // 2

const maxAge = 5*60*1000 // 세션의 유호기간을 따로 변수로 뺌뺌



// 라우팅
const home = require("./src/routes/home");


const sessionObj = {
    secret: '#$!83617#134', // 암호화할때 필요한 요소값 (아무값임)
    resave: false,
    saveUninitialized: true,
    store: new Memorystore({checkPeriod:maxAge}), // memorystore를 usersjson에 활용을 해야 하는데데
    cookie: {
        maxAge:maxAge, // 쿠키에 대한 여러 설정을 객체 안에 넣음 
        // (maxAge, Httponly, path 등등)
    } 
}



// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
// URL를 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결 하는 코드
app.use(express.urlencoded({ extended: true }));

// 정적 파일 제공
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

app.use("/", home); // use -> 미들웨어를 등록해주는 메서드



app.use(cookieParser())
app.use(session(sessionObj)) // 쿠키가 있는지 없는지 확인해주는 미들웨어


module.exports = app;
