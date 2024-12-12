"use strict";

const multer = require('multer');
const path = require('path');
const fs = require('fs');

class Upload {
    static #uploadDir = path.join(__dirname, '../../uploads');

    static #ensureUploadDir() {
        if (!fs.existsSync(this.#uploadDir)) {
            fs.mkdirSync(this.#uploadDir, { recursive: true });
        }
    }

    static #storage = multer.diskStorage({
        destination: (req, file, cb) => {
            this.#ensureUploadDir();
            cb(null, this.#uploadDir);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = path.extname(file.originalname).toLowerCase();
            cb(null, uniqueSuffix + ext);
        }
    });

    static #fileFilter = (req, file, cb) => {
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'video/mp4',
            'video/webm',
            'video/quicktime'
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('지원되지 않는 파일 형식입니다. (지원 형식: JPG, PNG, GIF, MP4, WEBM, MOV)'), false);
        }
    };

    static #upload = multer({
        storage: this.#storage,
        limits: {
            fileSize: 100 * 1024 * 1024, // 100MB
        },
        fileFilter: this.#fileFilter
    }).single('file'); // 'file'은 form의 input name과 일치해야 함

    static getUploader() {
        return (req, res, next) => {
            this.#upload(req, res, (err) => {
                if (err) {
                    console.error('Multer error:', err);
                    return res.status(400).json({
                        success: false,
                        message: err.message || '파일 업로드 중 오류가 발생했습니다.'
                    });
                }
                next();
            });
        };
    }
}

module.exports = Upload;