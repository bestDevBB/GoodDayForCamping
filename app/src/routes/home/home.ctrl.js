// 컨트롤러 기능 구현
"use strict";

const logger = require('../../config/logger.js');
const User = require('../../models/User.js');
// const UserStorage = require('../../models/UserStorage.js')

const output = {
    home: (req, res) => {
        logger.info('GET / 200 "홈 화면으로 이동"');
        res.render('home/index.ejs'); // views라는 폴더로 지정해놨기 때문에 home 폴더부터
        console.log(req.url, "/ 화면");
    },    
    login: (req, res) => {
        logger.info('GET /login 200 "로그인 화면으로 이동"');
        res.render('home/login.ejs');
        console.log(req.url, '/login 화면');
    },
    register: (req, res) => {
        logger.info('GET /register 200 "회원가입 화면으로 이동"');
        res.render('home/register.ejs');
        console.log(req.url, '/register 화면');
    }
};


const process = {
    login: async (req, res) => {
        // 이 컨트롤러는 UserStorage에 접근하지 않음!
        const user = new User(req.body); // 이 body가 User.js의 User클래스의 생성자의 body로 들어감
        // User라는 클래스를 인스턴스화할 때 클라이언트가 전달한 req 데이터를 넣어서 인스턴스화를 함
        // user는 User.js의 User 클래스의 body를 계속 들고다니게 됨
        const response = await user.login(); // 어떠한 response를 받을거고
        // user가 login이라는 메소드를 호출하면 User.js의 User클래스의 this.body를 가져와서 body의 id 값,
        // 즉 클라이언트가 입력한 id 값을 UserStorage의 메소드(getUserInfo)로 전달을 함.
        // id에 해당하는 정보를 이 클래스가 반환함
        // 받아올 때는 id랑 password만 받아옴. { id, password, name }이라 하면 name까지 받아옴

        if(response.err) {
            logger.error(`POST /login 200 Response: "success: ${response.success}, msg: ${response.err}"`)
            // err만 띄워줘도 오브젝트 형태로 보일거임
            
        } else {
            logger.info(
                `POST /login 200 Response: "success: ${response.success}, msg: ${response.msg}"`)
        };

        // console.log(response);
        return res.json(response); // 클라이언트한테 json의 형태로 응답해줌

        // const id = req.body.id,
        //     password = req.body.password;
        // // const userStorage = new UserStorage(); // class니까 인스턴스 만들어줄 때 이런식으로
        // // 데이터를 저장하고 있는 UserStorage는 인스턴스화를 시켜주지 않아도 됨
        // // console.log(userStorage.users);
        // // console.log(UserStorage.users);
        // // console.log(UserStorage.getUsers("id", "password")); // id, password 필드만 가져와달라
        // const users = UserStorage.getUsers("id", "password"); // id, password 필드만 가져와달라. 로그인 검증
        // // console.log(UserStorage.getUsers("id", "password", "name")); // id, password 필드만 가져와달라

        // // 1. UserStorage에 있는 users 데이터를 가져와서

        // const response = {};
        // // console.log(req.body); // login.js에서 body로 데이터를 전달하기 때문에 body를 보려면 요청에서 body로 접근
        // // console.log(id, password);
        // if(users.id.includes(id)) { // users의 id에 includes라는 메소드를 사용해서 id가 있고 id의 인덱스와 같은 위치에 있는 password랑 검사를 해줘야함
        //     const idx = users.id.indexOf(id);
        //     if(users.password[idx] === password) { // 프론트엔드에서 전달한 password와 같다면
        //         response.success = true;
        //         return res.json(response);
        //         // return res.json({
        //         //     // success: true // 로그인이 성공을 하게되면 success: true라는 오브젝트를 json으로 만들어서 프론트엔드로 응답해줌
        //         // }); // 프론트엔드한테 로그인이 성공했는지 여부를 응답
        //     };
        // };
        // // 2. 여기서 user를 검증하는 로직을 구현

        // response.success = false;
        // response.msg = "로그인에 실패하셨습니다.";
        // return res.json(response);
        // // return res.json({ // 실패했다면
        // //     // success: false,
        // //     // msg: "로그인에 실패하셨습니다."
        // // });
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register(); // User.js의 register 함수
        if(response.err) {
            logger.error(`POST /register 200 Response: "success: ${response.success}, msg: ${response.err}"`)
        } else
        logger.info(
            `POST /register 200 Response: "success: ${response.success}, msg: ${response.msg}"`
        )
        return res.json(response);
    }
};


module.exports = {
    output,
    process
};