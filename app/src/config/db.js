const { Client } = require('pg');

const db = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
})

db
    .connect()
    .then(() => console.log('데이터베이스 연결 성공!'))
    .catch(err => console.error('연결 오류 :', err.stack))

module.exports = db;