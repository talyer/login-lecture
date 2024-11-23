"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;

    }
    async login() {
        const client = this.body;
        const { id, psword } = await UserStorage.getUsersInfo(client.id); // await는 promise를 반환하는 애한테 주는 옵션
        
        if (id) {
            if (id === client.id && psword === client.psword) {
                return { success: true };
            }
            return { success: false, msg: "wrong to password." };
        }
        return { success : false, msg: "wrong to id." };
    }

    register() {
        const client = this.body;
        const response = UserStorage.save(client);
        return response;
    }
}

module.exports = User;