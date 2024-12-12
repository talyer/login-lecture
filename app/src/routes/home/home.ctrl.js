"use strict";

const UserStorage = require("../../models/User");
const User = require("../../models/User");
const path = require("path");


const output = {
    home: (req,res) => {
        // res.sendFile(path.join(__dirname, "index.ejs"));
        res.render("home/login"); //
    },

    login: (req, res) => {
        res.render("home/login");
    },
    register: (req, res) => {
        res.render("home/register");
    },
    upload: (req, res) => {
        res.render("home/index"); //
        try {
            if (!req.file) {
                return res.status(400).json({ 
                    success: false, 
                    message: '파일이 업로드되지 않았습니다.' 
                });
            }

            res.json({
                success: true,
                message: '파일 업로드 성공',
                filename: req.file.filename
            });
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: '서버 오류가 발생했습니다.' 
            });
        }
    },
};



const process = {
    login: async (req,res) => {
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    },
    register: async (req,res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },
    upload: (req, res) => {
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

            return res.json({
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

