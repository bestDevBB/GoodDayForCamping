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

        try {
            // const { id, password } = await UserStorage.getUserInfo(client.id);
            const user = await UserStorage.getUserInfo(client.id);
            // await UserStorage.getUserInfo(client.id);
            // console.log(client.id);
            // await : promise를 반환하는 애한테만 쓸 수 있음, 옵션같은 것!
            // async라는 함수 안에서만 쓸 수 있다.
            // getUserInfo 함수가 수행하는데 시간이 좀 걸리니 기다려라
            /* Promise를 반환하기 때문에 .then()으로도 접근하여 데이터를 가져올 수 있다.
            await을 사용해준 이유는 가독성!
            fs(파일시스템)에서도 await으로 가져올 수 있다. */

            // UserStorage.getUserInfo(client.id);
            // console.log(a);

            if(user){
                if(user.id === client.id && user.password === client.password) { // storage에서 가져온 id와 클라이언트가 입력한 body에 id가 같고 storage의 password와 클라이언트가 입력한 body의 password가 같은지
                    return { success : true };
                };
                return { success: false, msg: "비밀번호가 틀렸습니다."};
            };
            return { success: false, msg: "존재하지 않는 아이디입니다."};
        } catch(err) {
            // return { success: false, err: err };
            return { success: false, err }; // 키랑 밸류 같으면 키만 입력해도됨
        }
        // if(id){
        //     if(id === client.id && password === client.password) { // storage에서 가져온 id와 클라이언트가 입력한 body에 id가 같고 storage의 password와 클라이언트가 입력한 body의 password가 같은지
        //         return { success : true };
        //     };
        //     return { success: false, msg: "비밀번호가 틀렸습니다."};
        // };
        // return { success: false, msg: "존재하지 않는 아이디입니다."};
    }

    async register() {
        const client = this.body;
        try { // async/await은 try/catch로 에러처리
            const response = await UserStorage.save(client); // UserStorage.js의 save함수
            // client를 storage에 저장하는데에 시간이 오래 걸리므로 모두 저장할 때까지 기다리라고 await
            return response;

            // UserStorage에서 중복된 아이디를 클라이언트가 입력해서 회원가입을 누르면
            // 이미 존재하는 아이디입니다라는 에러를 만들어서 유저에게 반환

        } catch(err) {
            // console.error(err);
            return { success: false, err }; // error를 object로 던짐
        }
    }
};

module.exports = User;