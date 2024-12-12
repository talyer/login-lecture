"use strict";

const path = require('path');
const fs = require('fs');

class PreviewController {
    static async showPreview(req, res) {
        try {
            const fileName = req.params.fileName;
            const filePath = path.join(__dirname, '../../../uploads', fileName);

            // 파일 존재 여부 확인
            if (!fs.existsSync(filePath)) {
                return res.status(404).render('home/error', {
                    message: '파일을 찾을 수 없습니다.'
                });
            }

            // 파일 타입 확인
            let fileType = 'unknown';
            if (fileName.match(/\.(jpg|jpeg|png|gif)$/i)) {
                fileType = 'image';
            } else if (fileName.match(/\.(mp4|webm|mov)$/i)) {
                fileType = 'video';
            }

            // 파일 정보 가져오기
            const stats = fs.statSync(filePath);
            const fileInfo = {
                originalName: fileName,
                fileSize: (stats.size / 1024).toFixed(2) + ' KB',
                uploadDate: stats.mtime
            };

            res.render('home/preview', {
                fileName: fileName,
                fileType: fileType,
                fileInfo: fileInfo
            });
        } catch (error) {
            console.error('Preview error:', error);
            res.status(500).render('home/error', {
                message: '파일 미리보기 처리 중 오류가 발생했습니다.'
            });
        }
    }
}

module.exports = PreviewController;