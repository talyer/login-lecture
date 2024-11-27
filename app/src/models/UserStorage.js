"use strict"; // ECMA스크립트 문법을 준수하겠다는 명시

const fs = require("fs").promises;



// 유저 저장 
class UserStorage { // 사용자 데이터 관리와 관련되 여러 정적 메서드 제공

    // 로그인 데이터를 getUserInfo 매서드로 보내주기
    // 메서드 이름 앞의 #는 JavaScript에서 비공개(private) 메서드를 나타냄. 외부에서 호출할 수 없으며, 클래스 내부에서만 접근 가능함    .
    static #getUserInfo(data, id) { // 특정 사용자 id정보 가져옴
        const users = JSON.parse(data); // json형식 데이터를 javaScript객체로 변환
        const index = users.id.indexOf(id); // id가 user.json에서 몇번째 위치에 있는지 확인
        const userInfo = Object.keys(users).reduce((newUser, info) => { // 모든 속성인 id, name, psword를 순회하며, 
            //해당 사용자의 데이터를 새 객체 newUser로 추출
            newUser[info] = users[info][index];
            return newUser;
        }, {});

    return userInfo;
    }


    static #getUsers(data, isAll, fields) { // 모든 사용자 데이터 또는 지정된 필드만 반환
        const users = JSON.parse(data);
        if (isAll) return users; 

        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field]; // fields 배열을 순회하며, 사용자 대ㅔ이터에서 해당 필드만 추출
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    static getUsers(isAll, ...fields) { // 모든 사용자 데이터 또는 필드만 반환
        return fs // fs모듈 
        .readFile("./src/databases/users.json") // user.json 파일을 읽음
        .then((data) => { // 읽은 데이터를 #getUsers로 전달해 가공
            return this.#getUsers(data, isAll, fields); // 결과 반환
        })
        .catch(console.error);
    }


    // 로그인
    static getUsersInfo(id) { // 특정 사용자의 데이터를 반환
        return fs // fs 모듈
        .readFile("./src/databases/users.json") // user.json 파일을 읽음
        .then((data) => { // 읽은 데이터를 #getUsers로 전달받음
            return this.#getUserInfo(data, id); 
        })
        .catch(console.error);
    }
    
    // 회원 가입
    static async save(userInfo) { // 새로운 사용자를 user.json 파일에 저장
        const users = await this.getUsers(true); // 모든 사용자 데이터를 가져옴
        if (users.id.includes(userInfo.id)) {   // users.id 배열에 id가 이미 있으면 에러 발생
            throw 'The ID already exists.';
        }
        users.id.push(userInfo.id); // id배열에 데이터 추가
        users.name.push(userInfo.name); // name배열에 데이터 추가
        users.psword.push(userInfo.psword); // psword배열에 데이터 추가
        fs.writeFile("./src/databases/users.json", JSON.stringify(users)); // 업데이트된 데이터를 user.json 파일에 저장
        return { success: true };
        
    }
}

module.exports = UserStorage;