"use strict";

// 모듈
const express = require('express');
const app = express();

// 라우팅
const home = require('./src/routes/home'); // home까지만 해줘도 index.js 읽어옴

// 앱 세팅
app.set("views", "./src/views"); // 화면 뷰를 관리해줄 파일이 저장될 폴더 이름은 두 번째 파라미터로 넘겨줌
app.set("views engine", "ejs"); // html 코드들을 어떤 엔진으로 해석할지 정함. view engine을 ejs로 사용. html과 비슷

app.use("/", home); // use : 미들웨어를 등록해주는 메소드, / 로 들어오면 home으로 보내줌, "/"을 안써줘도 가동이 됨

module.exports = app;