"use strict";

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');

router.get('/', ctrl.output.home); // API
router.get('/login', ctrl.output.login);
router.get('/register', ctrl.output.register);

router.post('/login', ctrl.process.login); // 프론트엔드가 전달한 로그인 데이터를 받아서 로그인 기능을 처리
router.post('/register', ctrl.process.register); // 회원가입 처리, home.ctrl.js의 register함수

module.exports = router;