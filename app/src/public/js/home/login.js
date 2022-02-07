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
    fetch("/login", { // 로그인을 요청하는 fetch, 서버에 전달
        method: "POST",
        headers: {
            "Content-Type": "application/json" // 내가 보내는 데이터의 타입
        }, // JSON 데이터라고 알려줌
        body: JSON.stringify(req) // req를 문자열로 바꿔줌
    })
    .then((res) => res.json()) // 서버에서 응답한 데이터를 다시 받으려면 then() 메소드를 사용해서 데이터를 가져올 수 있음. res가 파라미터로 전달됨. res.json()을 반환.
    // .then((res) => console.log(res));
    // .then(console.log);
    .then((res) => {
        // if(res.success) { // res에서 success이라는 값이 true이면
        //     location.href = "/"; // 이 링크로 이동시켜줌
        // } else {
        //     alert(res.msg);
        // };
    })
    .catch((err) => {
        console.error(new Error("로그인 중 에러 발생"));
    });
}; // 이러한 데이터를 서버에서 받으려면 /login 경로, POST 메서드로 데이터를 받을 수 있는 API가 마련되어있어야 함

/* res.json()의 반환 값은 Promise다.
기본 res의 반환 값은 Response 스트림인데
".json()" 메서드를 통해 Response(응답) 스트림을 읽을 수 있다.
Response는 데이터가 모두 받아진 상태가 아니다.
".json()"으로 Response 스트림을 가져와 완료될 떄까지 읽는다.
다 읽은 body의 텍스트를 Promise 형태로 반환한다. */