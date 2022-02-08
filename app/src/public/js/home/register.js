"use strict";

// DOM
const id = document.querySelector("#id"),
    name = document.querySelector("#name"),
    password = document.querySelector("#password"),
    confirmPassword = document.querySelector("#confirm-password"),
    registerBtn = document.querySelector("#button");



registerBtn.addEventListener("click", register);

function register() {
    if(!id.value) return alert('아이디를 입력해주세요.');
    if(password.value !== confirmPassword.value) return alert('비밀번호가 일치하지 않습니다.');

    const req = {
        id: id.value,
        name: name.value,
        password: password.value,
    };

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req) // SIGN UP 버튼이 눌리면 id, name 등 해당하는 데이터들을 이 body에 담아서 전달 -> POST로 요청
    })
    .then((res) => res.json()) // 서버로부터 응답이 오면 json 메소드를 호출해서 서버에 응답이 다 받아지는 순간 Promise 객체를 반환
    .then((res) => { // Promise 객체로 반환을 했으니까 then으로 접근해서 res로 접근
        if(res.success) {
            location.href = "/login";
        } else {
            alert(res.msg);
        };
    })
    .catch((err) => {
        console.error(new Error("회원가입 중 에러 발생"));
    });
};