"use strict"; // ECMA스크립트 문법을 준수하겠다는 명시

const UserStorage = require("./UserStorage"); // userStorage 호출

class User { // User 클래스 정의
    constructor(body) { // User클래스는 객체를 생성할 때 사용자 데이터를 body 속성으로 받음
        this.body = body; // body를 설정하여 자료를 저장할 수 있게

    }
    async login() {  // 기능: 사용자가 입력한 아이다와 비밀번호로 로그인 요청을 처리
        const client = this.body; // 저장된 client값이 body에
        const { id, psword } = await UserStorage.getUsersInfo(client.id); // 비동기식 함수, UserStorge모듈의 매서드 호출, 사용자 정보 가져옴
        
        if (id) {
            if (id === client.id && psword === client.psword) { // 로그인할떄 아이디랑 패스워드가 같으면 로그인 성공
                return { success: true };
            }
            return { success: false, msg: "wrong to password." }; // 아니면 비번 틀림
        }
        return { success : false, msg: "wrong to id." }; // 아이디 틀림 
    }

    async register() { // 새로운 사용자를 회원 가입
        const client = this.body; // 저장된 client값이 body에
        try {
            const response = await UserStorage.save(client); // 비동기식, USerStorage에서 사용자 정보 저장
            return response;
        } catch (err) {
        return { success: false, msg: err };
        }
    }
}

module.exports = User;