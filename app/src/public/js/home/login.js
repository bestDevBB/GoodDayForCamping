"use strict";

// DOM
const id = document.querySelector("#id"), // <input id = "id" .../>
    password = document.querySelector("#password"),
    loginBtn = document.querySelector("button");

//console.log(id); // null, #id를 가져오기 전에 console가 먼저 실행되서 null이 뜸

loginBtn.addEventListener("click", login); // login()

function login() {
    const req = {
        id: id.value,
        password: password.value
    };
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // 내가 보내는 데이터의 타입
        }, // JSON 데이터라고 알려줌
        body: JSON.stringify(req) // req를 문자열로 바꿔줌
    }); // 서버에 전달
}; // 이러한 데이터를 서버에서 받으려면 /login 경로, POST 메서드로 데이터를 받을 수 있는 API가 마련되어있어야 함