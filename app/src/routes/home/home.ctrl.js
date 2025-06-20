"use strict";

const UserStorage = require("../../models/User");
const User = require("../../models/User");
const fs = require('fs');
const path = require("path");


const output = {
    home: (req,res) => {
        res.cookie("key", "value");
        const uploadDir = path.join(__dirname, '../../../uploads');
        fs.readdir(uploadDir, (err, files) => {
            if (err) { 
                return res.render("home/home", { files });
            }
            res.render("home/home", { files });
        });
    },

    login: (req, res) => {
        res.render("home/login");
    },
    register: (req, res) => {
        res.render("home/register");
    },
    upload: (req, res) => {
        res.render("home/index"); 
    },

    
};



const process = {
    login: async (req,res) => {
        const user = new User(req.body);
        const response = await user.login();
        /////////////////////////////
        // if (response.success) {
        //     req.session.user = { id: req.body.id };
        // };
        //////////////////////////////
        return res.json(response);
    },
    register: async (req,res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },
    upload: async (req, res) => {
        try {
            console.log('Upload request received:', req.file); // 디버깅용 로그

            if (!req.file) {
                return res.status(400).json({ 
                    success: false, 
                    message: '파일이 업로드되지 않았습니다.' 
                });
            }

            const fileType = req.file.mimetype.startsWith('image/') ? 'image' : 
                           req.file.mimetype.startsWith('video/') ? 'video' : 'unknown';

            return res.json ({ // response 수정
                success: true,
                message: '파일 업로드 성공',
                filename: req.file.filename,
                fileType: fileType
            });
        } catch (error) {
            console.error('Upload error:', error); // 디버깅용 로그
            return res.status(500).json({ 
                success: false, 
                message: '서버 오류가 발생했습니다.' 
            });
        }
    },
};

module.exports = {
    output,
    process,
};

