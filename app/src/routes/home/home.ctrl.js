// 컨트롤러 기능 구현
"use strict";

const logger = require('../../config/logger.js');
const User = require('../../models/User.js');

const output = {
    home: (req, res) => {
        logger.info('GET / 304 "홈 화면으로 이동"');
        res.render('home/index.ejs'); // views라는 폴더로 지정해놨기 때문에 home 폴더부터
        console.log(req.url, "/ 화면");

        // render를 사용하면 맨 처음에는 200번대 코드를 반환,
        // 그 다음부터는 304를 반환
        // http 상태코드 mdn 검색!!!
        
        // render는 자체적으로 알맞은 상태코드를 반환하기 때문에 따로 부여 안해줬음
    },

    login: (req, res) => {
        logger.info('GET /login 304 "로그인 화면으로 이동"');
        res.render('home/login.ejs');
        console.log(req.url, '/login 화면');
    },

    register: (req, res) => {
        logger.info('GET /register 304 "회원가입 화면으로 이동"');
        res.render('home/register.ejs');
        console.log(req.url , '/register 화면');
    }
};


const process = {
    login: async (req, res) => { // login.js에서 req 데이터를 전달했음
        // req는 프론트엔드에서 전달한 request 요청 데이터를 담아두는 변수

        // 이 컨트롤러는 UserStorage에 접근하지 않음!
        const user = new User(req.body); // 이 body가 User.js의 User클래스의 생성자의 body로 들어감
        // User라는 클래스를 인스턴스화할 때 클라이언트가 전달한 req 데이터를 넣어서 인스턴스화를 함
        // user는 User.js의 User 클래스의 body를 계속 들고다니게 됨
        const response = await user.login(); // 어떠한 response를 받을거고
        // user가 login이라는 메소드를 호출하면 User.js의 User클래스의 this.body를 가져와서 body의 id 값,
        // 즉 클라이언트가 입력한 id 값을 UserStorage의 메소드(getUserInfo)로 전달을 함.
        // id에 해당하는 정보를 이 클래스가 반환함
        // 받아올 때는 id랑 password만 받아옴. { id, password, name }이라 하면 name까지 받아옴

        // log의 두 번째 파라미터를 변수로 빼줬음
        const url = { // object /login
            method: "POST",
            path: "/login",
            status: response.err ? 400 : 200
            // 에러가 있으면 정상이 아님 -> 400 반환, 정상이면 200
            // 정상응답 : 200번대 라는건 서버에서 정상적인 응답을 반환해줬다는 것
            // 서버가 응답할 때 body에 어떠한 데이터를 함께 전달해줬다.
            // 400 : 클라이언트에서 실패할 때
        };

        // user가 로그인(login())을 하면 response를 user models(User.js)이 던져줌
        // response에서 에러가 발생하면 error 로그를 출력하고 
        // 정상이면 info 레벨의 로그를 출력

        log(response, url);

        return res.status(url.status).json(response); // 서버에서 클라이언트한테 response를 json의 형태로 응답해주고 response는 body로 전달이 됨
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register(); // User.js의 register 함수

        // log의 두 번째 파라미터를 변수로 빼줬음
        const url = { // object /register
            method: "POST",
            path: "/register",
            status: response.err ? 409 : 201
            // register는 정상응답 반응으로 201 반환해야함
            // 데이터가 생성되는 것이기 때문에
            // 여기 에러는 데이터베이스 에러이므로 서버측 에러이기 때문에 400(클라이언트측 에러)이 아니라 500번대를 반환해주는게 맞음
            // 하지만 여기서는 400번대 맞음
            // 409는 클라이언트가 회원가입 할 때 아이디가 이미 있는 아이디인 경우 데이터베이스와 충돌하므로 그 때 발생시키는 에러코드임
        };

        log(response, url);
        return res.status(url.status).json(response);
    }
};


module.exports = {
    output,
    process
};

const log = (response, url) => {
    if(response.err) {
        logger.error(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.err}`
            // EX) POST /login 200
        );
    } else { // 에러가 없으면
        logger.info(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.msg || ""}`
        );
    };
}