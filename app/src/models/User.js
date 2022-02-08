// models은 로그인이나 회원가입 기능 구현을 하는 모델임
"use strict";

const UserStorage = require('./UserStorage');

class User {
    constructor(body) { // 생성자에서 전달받은 body를 save에 던져줌
        this.body = body;
    }

    login() {
        const client = this.body;
        // const { id, password } = UserStorage.getUsers("id", "password"); // id와 password라는 필드의 값을 가져옴
        // console.log(id, password);
        // const a = UserStorage.getUserInfo("BB");
        const { id, password } = UserStorage.getUserInfo(client.id);
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