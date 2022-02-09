const { Client } = require('pg');

const db = new Client({
    host: "localhost",
    port: 5432,
    user: 'postgres',
    database: 'gdfc',
    password: 'postgres'
})

// db.connect(err => {
//     if(err) {
//         console.error('연결 오류 :', err.stack);
//     } else {
//         console.log('데이터베이스 연결 성공!');
//     }
// });

db
    .connect()
    .then(() => console.log('데이터베이스 연결 성공!'))
    .catch(err => console.error('연결 오류 :', err.stack))

module.exports = db;