"use strict";

class UserStorage {
    static #users = {
        id: ["jun2400", "개발자", "송현준"],
        psword: ["1234", "1234", "123456"],
        name: ["송현준", "개발자", "팀장"],
    };

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }
   
    static getUsersInfo(id) {
        const users = this.#users;
        const index = users.id.indexOf(id);
        const userInfo = Object.keys(users).reduce((newUser, info) => {
            newUser[info] = users[info][index];
            return newUser;
        }, {});

        return userInfo;
    }
    
    // 회원 가입
    static save(userInfo) {
        const users =this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        return { success: true };
    }
}

module.exports = UserStorage;