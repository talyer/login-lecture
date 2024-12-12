const db = require('../config/database'); // 따로 설정
 // DB 설정에 맞게 수정 필요

class FileModel {
    static async getFileInfo(fileName) {
        try {
            // DB에서 파일 정보 조회 예시
            const query = 'SELECT * FROM files WHERE file_name = ?';
            const [fileInfo] = await db.execute(query, [fileName]);
            return fileInfo[0];
        } catch (error) {
            throw new Error('파일 정보를 가져오는데 실패했습니다.');
        }
    }
}

module.exports = FileModel;