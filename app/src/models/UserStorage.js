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


    static #getUsers(data, isAll, fields) {
        const users = JSON.parse(data);
        if (isAll) return users;

        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    static getUsers(isAll, ...fields) {
        return fs
        .readFile("./src/databases/users.json")
        .then((data) => {
            return this.#getUsers(data, isAll, fields); 
        })
        .catch(console.error);
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
    static async save(userInfo) {
        const users = await this.getUsers(true);
        if (users.id.includes(userInfo.id)) {   
            throw 'The ID already exists.';
        }
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        fs.writeFile("./src/databases/users.json", JSON.stringify(users)); 
        return { success: true };
        
    }
}

module.exports = UserStorage;