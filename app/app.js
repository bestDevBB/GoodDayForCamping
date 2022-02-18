// Node라는 서버의 기본 설정들이 이루어지게 됨
// 이 서버의 실행 파일은 bin 안에 있음
// src에는 MVC 디자인 패턴대로 파일들을 분류해두었음
"use strict";

// 모듈
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// 라우팅
const home = require('./src/routes/home'); // home까지만 해줘도 index.js 읽어옴

// 앱 세팅
app.set("views", "./src/views"); // 뷰 엔진 폴더(views)의 기본 경로 세팅,  화면 뷰를 관리해줄 파일이 저장될 폴더 이름은 두 번째 파라미터로 넘겨줌
app.set("views engine", "ejs"); // html 코드들을 어떤 엔진으로 해석할지 정함. view engine을 ejs로 사용. html과 비슷

app.use(express.static(`${__dirname}/src/public`)) // 정적 경로 추가, __dirname : 현재 디렉토리명(JB_Camping), app.js 파일이 있는 위치. login.ejs를 login.js에 연결시키기 위해 썼음
app.use(bodyParser.json()); // bodyparser가 json 데이터를 파싱해올 수 있도록 명시
// 클라이언트의 요청 데이터 중 json 객체를 파싱할 수 있게 하기 위함
// URL을 통해 전달되는 데이터에 연결, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제를 해결해줌
app.use(bodyParser.urlencoded({ extended: true })); // URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결

app.use("/", home); // use : 미들웨어를 등록해주는 메소드, / 로 들어오면 home으로 보내줌, "/"을 안써줘도 가동이 됨

module.exports = app;