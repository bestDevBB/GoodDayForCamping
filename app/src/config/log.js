"use strict";

// morgan 모듈 사용했던 js파일
const fs = require('fs');
const appRoot = require('app-root-path');

const accessLogStream = fs.createWriteStream(
  `${appRoot}/log/access.log`, // 뒤의 문자열을 하나의 경로로 조인(__dirname은 app.js의 경로)
  { flags: 'a' });

  module.exports = accessLogStream;