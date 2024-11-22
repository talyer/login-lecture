"use strict";

const output = {
    home: (req,res) => {
        res.render("home/index");
    },

    login: (req, res) => {
        res.render("home/login");
    },

};

const users = {
    id: ["jun2400", "개발자", "송현준"],
    psword: ["1234", "1234", "123456"],

};

const process = {
    login: (req,res) => {
        const id = req.body.id,
            psword = req.body.psword;

        if (users.id.includes(id)) {
            const index = users.id.indexOf(id);
            if (users.psword[index] === psword) {
                return res.json({
                    success: true,
                });
                
            } 
        }
        return res.json({
            success: false,
            msg: "false to login",
        });
    },
};

module.exports = {
    output,
    process,
};