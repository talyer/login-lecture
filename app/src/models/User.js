"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;

    }
    login() {
        const client = this.body;
        const { id, psword } = UserStorage.getUsersInfo(client.id);
        
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