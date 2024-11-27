"user strict"; // ECMA스크립트 문법을 준수하겠다는 명시

// 모듈
const express = require("express"); // express 사용
//const bodyParser = require("body-parser");  현재 body-parser는 express에 포함되어서? express로 사용하면 됨
const app = express(); // app변수에 express 실행

// 라우팅
const home = require("./src/routes/home"); // routes폴더에서 home폴더 안에 있는 javaScript를 가져오기


// 앱 세팅
app.set("views", "./src/views"); // views다료들을 app변수에 세팅 
app.set("view engine", "ejs"); // view 엔진을 ejs를 실행 할 수 있게 app변수에 세팅
app.use(express.static(`${__dirname}/src/public`)); // __dirname = app.js 파일에 있는 위치에 변환, 위치 안에 있는 src/public 파일은 정적 경로로 추가
app.use(express.json()); 

// URL를 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결 하는 코드
app.use(express.urlencoded({ extended: true })); 


app.use("/", home); // use -> 미들웨어를 등록해주는 메서드,  "/"경로로 오면 home으로 이동 
//=> 결과적으로 index.js파일로 이동해서 router.get("/", ctrl.output.home); 실행

module.exports = app; // app을 외부 파일에 사용할 수 있게 해줌 ==> bin/www.js
