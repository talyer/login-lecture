"user strict"; // ECMA스크립트 문법을 준수하겠다는 명시
const express = require("express"); // express 사용하기
const router = express.Router(); // express에 Router를 불러 router사용

const ctrl = require("./home.ctrl"); // home.ctrl.js를 받아옴-

// router는 단순히 "/" , "/login", "register" 도메인에 들어왔을때 클라이언트에 요청을 연결해주는 부분
// ctrl를 분리하여 코드 보기 편하게 함 
router.get("/", ctrl.output.home); // ctrl부분을 모듈화 하여 "/"경로로 왔을때는 home화면으로 이동(output을 이용해 home화면을 명확하게 명시하며 출력 )
router.get("/login", ctrl.output.login); // ctrl부분을 모듈화 하여 "/login"경로로 왔을때는 login화면으로 이동(output을 이용해 login화면을 명확하게 명시하며 출력 )
router.get("/register", ctrl.output.register); // ctrl부분을 모듈화 하여 "/register"경로로 왔을때는 register화면으로 이동 (output을 이용해 register화면을 명확하게 명시하며 출력 )

router.post("/login", ctrl.process.login); // 로그인 
router.post("/register", ctrl.process.register);
 
module.exports = router; //router를 외부 파일에 사용 할 수 있도록 내보내는 명령어