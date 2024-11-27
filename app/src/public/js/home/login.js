"use strict"; // ECMA스크립트 문법을 준수하겠다는 명시

// login.ejs와 연결해서 동작하는 javaScript

const id = document.querySelector("#id"), // 입력 필드에서 %%%가져옴
    psword = document.querySelector("#psword"),
    loginBtn = document.querySelector("#button");

    loginBtn.addEventListener("click", login); // 버튼을 누르면 login 함수 호출

    function login() { // login 함수
        const req = { 
            id : id.value, // 아이디 값
            psword: psword.value, // 비번 값
        };

        fetch("/login", { // fetch를 이용해 서버 요청
            method: "POST", // /login URL로 POST요청
            headers: {
                "Content-Type": "application/json", // 서버가 json 형식의 데이터를 받을 수 있도록 명시
            },
            body: JSON.stringify(req), // 입력값을 json 형태로 변환해 서버로 전송
        })
        .then((res) => res.json()) // 서버에서 받은 응답을 json 형식으로 변환
        .then((res) => {
            if (res.success) { 
                location.href = "/"; // 로그인 성공시 원래 사이트로 돌아가기
            } else {
                alert(res.msg); // 실패시 실패 알림창 출력
            }   
        })
        .catch((err) => { // 인터넷이 안되거나 사이트 문제가 있을시 나오는 문구
            console.error(new Error("Login error"));
        });
    
    }   