"use strict";

const output = {
    home: (req, res) => {
        res.render('home/index.ejs'); // views라는 폴더로 지정해놨기 때문에 home 폴더부터
        console.log(req.url, "/ 화면");
    },    
    login: (req, res) => {
        res.render('home/login.ejs');
        console.log(req.url, '/login 화면');
    }
};

const users = {
    id: ["BB", "Moong", "JOE"],
    password: ["1234", "123456", "1111"]
};

const process = {
    login: (req, res) => {
        const id = req.body.id,
            password = req.body.password;

        // console.log(req.body); // login.js에서 body로 데이터를 전달하기 때문에 body를 보려면 요청에서 body로 접근
        // console.log(id, password);
        if(users.id.includes(id)) { // users의 id에 includes라는 메소드를 사용해서 id가 있고 id의 인덱스와 같은 위치에 있는 password랑 검사를 해줘야함
            const idx = users.id.indexOf(id);
            if(users.password[idx] === password) { // 프론트엔드에서 전달한 password와 같다면
                return res.json({
                    success: true // 로그인이 성공을 하게되면 success: true라는 오브젝트를 json으로 만들어서 프론트엔드로 응답해줌
                }); // 프론트엔드한테 로그인이 성공했는지 여부를 응답
            };
        };

        return res.json({ // 실패했다면
            success: false,
            msg: "로그인에 실패하셨습니다."
        });
    }
};


module.exports = {
    output,
    process
};