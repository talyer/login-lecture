"use strict";

const { reduce } = require("async");

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
}

module.exports = UserStorage;