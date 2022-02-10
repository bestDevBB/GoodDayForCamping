"use strict";

const app = require('../app');
const logger = require('../src/config/logger.js');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    // console.log(PORT, '번 포트에서 서버 실행 중!');
    logger.info(`${PORT} 포트에서 서버 실행 중!`);
});