// models은 로그인이나 회원가입 기능 구현을 하는 모델임
"use strict";

const UserStorage = require('./UserStorage');

class User {
    constructor(body) { // 생성자에서 전달받은 body를 save에 던져줌
        this.body = body;
    }

    async login() { // async를 붙혀 비동기 함수로 바꿔줌. async는 함수 앞에 붙힘
        const client = this.body;
        // const { id, password } = UserStorage.getUsers("id", "password"); // id와 password라는 필드의 값을 가져옴
        // console.log(id, password);
        // const a = UserStorage.getUserInfo("BB");
        // console.log(UserStorage.getUserInfo(client.id));
        // pending : 데이터를 다 읽어오지 못했다.
        // UserStorage.js의 getUserInfo의 return 값인 userInfo가 반환되기 전에 console이 먼저 찍혀서 <pending>

        const { id, password } = await UserStorage.getUserInfo(client.id);
        // await : promise를 반환하는 애한테만 쓸 수 있음, 옵션같은 것!
        // async라는 함수 안에서만 쓸 수 있다.
        // getUserInfo 함수가 수행하는데 시간이 좀 걸리니 기다려라
        /* Promise를 반환하기 때문에 .then()으로도 접근하여 데이터를 가져올 수 있다.
        await을 사용해준 이유는 가독성!
        fs(파일시스템)에서도 await으로 가져올 수 있다. */

        // UserStorage.getUserInfo(client.id);
        // console.log(a);

        if(id){
            if(id === client.id && password === client.password) { // storage에서 가져온 id와 클라이언트가 입력한 body에 id가 같고 storage의 password와 클라이언트가 입력한 body의 password가 같은지
                return { success : true };
            };
            return { success: false, msg: "비밀번호가 틀렸습니다."};
        };
        return { success: false, msg: "존재하지 않는 아이디입니다."};
    }

    register() {
        const client = this.body;
        const response = UserStorage.save(client);
        return response;
    }
};

module.exports = User;