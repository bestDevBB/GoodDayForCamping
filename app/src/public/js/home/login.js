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
};