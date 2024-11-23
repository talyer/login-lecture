"use strict";

const fs = require("fs").promises;



// 유저 저장 
class UserStorage {

    // 로그인 데이터를 getUserInfo 매서드로 보내주기
    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        const index = users.id.indexOf(id);
        const userInfo = Object.keys(users).reduce((newUser, info) => {
            newUser[info] = users[info][index];
            return newUser;
        }, {});

    return userInfo;
    }

    static getUsers(...fields) {
        // const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }


    // 로그인
    static getUsersInfo(id) {
        return fs
        .readFile("./src/databases/users.json")
        .then((data) => {
            return this.#getUserInfo(data, id); 
        })
        .catch(console.error);
    }
    
    // 회원 가입
    static save(userInfo) {
        // const users =this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        return { success: true };
    }
}

module.exports = UserStorage;