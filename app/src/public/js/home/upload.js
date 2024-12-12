"use strict";

class UploadHandler {
    constructor() {
        this.form = document.querySelector('form');
        this.fileInput = document.querySelector('input[type="file"]');
        this.preview = document.querySelector('#preview');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (!file) return;

        const preview = this.preview;
        preview.innerHTML = ''; // 기존 미리보기 삭제

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.innerHTML = `
                    <img src="${e.target.result}" style="max-width: 300px; margin-top: 20px;">
                `;
            };
            reader.readAsDataURL(file);
        } else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.style.maxWidth = '300px';
            video.style.marginTop = '20px';
            video.controls = true;
            video.src = URL.createObjectURL(file);
            preview.appendChild(video);
        } else {
            preview.innerHTML = '<p>지원되지 않는 파일 형식입니다.</p>';
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                window.location.href = `/preview/${data.filename}`;
            } else {
                throw new Error(data.message || '업로드 실패');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('업로드 중 오류가 발생했습니다: ' + error.message);
        }
    }
}

// 페이지 로드 시 핸들러 초기화
window.addEventListener('load', () => {
    new UploadHandler();
});