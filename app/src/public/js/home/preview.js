"use strict";

class PreviewHandler {
    constructor() {
        this.initializeElements();
        this.addEventListeners();
    }

    initializeElements() {
        // 비디오 요소가 있는 경우 초기화
        this.videoPlayer = document.querySelector('.video-preview');
        this.imagePreview = document.querySelector('.image-preview');
        this.downloadBtn = document.querySelector('.btn[download]');
        this.backBtn = document.querySelector('.btn:not([download])');
    }

    addEventListeners() {
        // 비디오 플레이어 이벤트 리스너
        if (this.videoPlayer) {
            this.videoPlayer.addEventListener('loadedmetadata', () => {
                console.log('비디오 메타데이터 로드됨');
            });

            this.videoPlayer.addEventListener('error', (e) => {
                console.error('비디오 로드 중 오류:', e);
                this.handleMediaError();
            });
        }

        // 이미지 프리뷰 이벤트 리스너
        if (this.imagePreview) {
            this.imagePreview.addEventListener('error', (e) => {
                console.error('이미지 로드 중 오류:', e);
                this.handleMediaError();
            });
        }

        // 다운로드 버튼 이벤트 리스너
        if (this.downloadBtn) {
            this.downloadBtn.addEventListener('click', (e) => {
                this.handleDownload(e);
            });
        }

        // 뒤로가기 버튼 이벤트 리스너
        if (this.backBtn) {
            this.backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleBack();
            });
        }

        // 키보드 단축키
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
    }

    handleMediaError() {
        const previewContainer = document.querySelector('.file-preview');
        if (previewContainer) {
            previewContainer.innerHTML = `
                <div class="error-message">
                    <p>미디어를 불러오는 중 오류가 발생했습니다.</p>
                    <p>파일이 손상되었거나 접근할 수 없습니다.</p>
                </div>
            `;
        }
    }

    handleDownload(e) {
        try {
            // 다운로드 시작 알림
            const fileName = this.downloadBtn.getAttribute('href').split('/').pop();
            console.log(`다운로드 시작: ${fileName}`);
        } catch (error) {
            console.error('다운로드 중 오류:', error);
            e.preventDefault();
            alert('다운로드 중 오류가 발생했습니다.');
        }
    }

    handleBack() {
        // 브라우저 히스토리가 있으면 뒤로가기, 없으면 홈으로
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/index';
        }
    }

    handleKeyPress(e) {
        // ESC 키로 뒤로가기
        if (e.key === 'Escape') {
            this.handleBack();
        }

        // 비디오 플레이어 단축키
        if (this.videoPlayer) {
            switch(e.key.toLowerCase()) {
                case ' ':  // 스페이스바
                    e.preventDefault();
                    this.toggleVideo();
                    break;
                case 'f':  // 전체화면
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
                case 'm':  // 음소거
                    e.preventDefault();
                    this.toggleMute();
                    break;
            }
        }
    }

    toggleVideo() {
        if (this.videoPlayer) {
            if (this.videoPlayer.paused) {
                this.videoPlayer.play();
            } else {
                this.videoPlayer.pause();
            }
        }
    }

    toggleFullscreen() {
        if (this.videoPlayer) {
            if (!document.fullscreenElement) {
                this.videoPlayer.requestFullscreen().catch(err => {
                    console.error('전체화면 전환 실패:', err);
                });
            } else {
                document.exitFullscreen();
            }
        }
    }

    toggleMute() {
        if (this.videoPlayer) {
            this.videoPlayer.muted = !this.videoPlayer.muted;
        }
    }
}

// 페이지 로드 시 초기화
window.addEventListener('load', () => {
    new PreviewHandler();
});