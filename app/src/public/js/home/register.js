"use strict";

// register.ejs와 연결해서 동작하는 javaScript

const id = document.querySelector("#id"),
    name = document.querySelector("#name"),
    psword = document.querySelector("#psword"),
    comfirmPsword = document.querySelector("#comfirm-psword"),
    registerBtn = document.querySelector("#button");

    registerBtn.addEventListener("click", register);

    function register() {
        if (!id.value) return alert("Input id.");  // 아이디 입력 안하면 alert
        if (!name.value) return alert("Input name."); // 이릅 입력 안하면 alert
        if (!psword.value) return alert("Input password"); // 비번 입력 안하면 alert
        if (psword.value !== comfirmPsword.value) return alert("Comfirm-password !== password."); // 비번이랑 확인차 비번이 틀리면 alert



        const req = {  // 값
            id : id.value,
            name: name.value,
            psword: psword.value,
        };

        fetch("/register", { // fetch로 서버요철
            method: "POST", //  /register URL로 POST 요청
            headers: {
                "Content-Type": "application/json", // 서버가 json형식의 데이터를 받을 수 있도록 명시
            },
            body: JSON.stringify(req), // 사용자 입력값을 json 형태로 변환해 stringify값에 저장 후 서버 전송
        })
        .then((res) => res.json()) // 서버에서 받은 응답을 json 형식으로 변환
        .then((res) => {
            if (res.success) {
                location.href = "/login"; // 로그인 성공시 원래 사이트로 돌아가기
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => { // 인터넷이 안되거나 사이트 문제가 있을시 나오는 문구
            console.error(new Error("register error"));
        });
    
    }   