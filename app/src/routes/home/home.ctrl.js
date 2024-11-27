"use strict"; // ECMA스크립트 문법을 준수하겠다는 명시

const UserStorage = require("../../models/UserStorage");
const User = require("../../models/User");

const output = { 
    home: (req,res) => { // [function () ===  () =>] home이라는 컨트롤러 함수를 만들어서 외부파일에서 사용
        res.render("home/index"); // index.ejs를 띄울수 있게 해줌
    },

    login: (req, res) => { // login이라는 컨트롤러 함수를 만들어서 외부파일에서 사용
        res.render("home/login"); // login.ejs를 띄울 수 있게 해줌
    },
    register: (req, res) => { // register이라는 컨트롤러 함수를 만들어서 외부파일에서 사용
        res.render("home/register"); // register.ejs를 띄울 수 있게 해줌
    },
};



const process = {
    login: async (req,res) => { // 
        const user = new User(req.body); // body값 호출
        const response = await user.login(); // login기능 
        return res.json(response); // 결과를 json형식으로 응답
    },
    register: async (req,res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response); // 결과를 json형식으로 응답
    },
};

module.exports = { // 내푸 파일에서도 사용할 수 있게 내보냄
    output, //output값을 내보냄 => index.js
    process, // process를 내보냄 => index.js
};

