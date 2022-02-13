"use strict";

const db = require('../config/db.js');

class UserStorage { // class
  static getUserInfo(id) { // User.js의 login()에 getUserInfo하고 id 값을 던짐
    return new Promise((resolve, reject) => {
      const query = "SELECT * from users WHERE id = $1;";
      db.query(query, [id], (err, data) => { // 에러, 읽어온 데이터
        if(err) reject(`${err}`);
        else resolve(data.rows[0]);
        // console.log(data.rows[0]);
      });
    });
  }

  static async save(userInfo) { // 프론트가 데이터를 입력하고 SIGN UP을 누르면 userInfo에 들어옴
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users (id, name, password) VALUES($1, $2, $3);";
      db.query(query,
        [userInfo.id, userInfo.name, userInfo.password],
        (err) => {
        if(err) reject(`${err}`);
        else resolve( { success: true });
      });
    });
  }
};


// 데이터를 은닉화 시켜주고 메서드로 전달해줌

module.exports = UserStorage;