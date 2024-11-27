"use strict"; // ECMA스크립트 문법을 준수하겠다는 명시


const app = require("../app"); // app.js에 있는 내용을 불려오기
const PORT = 3000; // PORT 값 설정 

app.listen(PORT, () => { // 서버 띄우기   (function () === () => 둘이 같은거임 )
    console.log("서버가동");
    });
