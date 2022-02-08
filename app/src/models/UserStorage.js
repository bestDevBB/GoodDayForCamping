"use strict";

const fs = require('fs').promises; // filesystem

class UserStorage { // class
  // class 자체에서 users에 접근하고자 할 떄는 변수에 static을 선언해서 정적 변수로 만들어줌
  // static #users = { // const같은 선언자 필요 없음
  //   // #는 public한 변수에서 private한 변수로 선언해줌. 외부에서 불러올 수 없게함
  //   id: ["BB", "Moong", "ZOE"],
  //   password: ["1234", "123456", "1111"],
  //   name: ["LBR", "뭉이", "조이"]
  // };

  static #getUserInfo(data, id) { // 위에 getUserInfo() 함수랑 다른거임!
    const users = JSON.parse(data);
      const idx = users.id.indexOf(id); // getUserInfo의 파라미터로 넘겨준 (id)
      const usersKeys = Object.keys(users); // users의 키값들만 list로 만듦 => [id, password, name]
      const userInfo = usersKeys.reduce((newUser, info) => { // [id, password, name]를 usersKeys에 넣어서 배열에 reduce를 돌려줌/ newUser의 초기값으로는 {}를 넣어줬음
        newUser[info] = users[info][idx]; // newUser에 키값이 순차적으로 들어감(처음에는 id) // users의 키값의 idx
        return newUser;
      }, {});
      // console.log(userInfo);
      return userInfo; // getUserInfo가 반환하는 건 userInfo
  }

  // 외부에서 데이터를 받을 수 있게
  static getUsers(...fields) { // class 자체에서 메서드에 접근을 하려면 또한 static을 붙혀줌
    // console.log(fields); // 변수명에 파라미터로 넘긴 데이터들이 배열 형태로 들어옴, ['id', 'password']
    // const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => { // reduce: 배열 메소드(반복문). fields에 대한 원소가 하나씩 순회가 됨, 새로운 오브젝트가 생성될거 newUsers
      // newUsers에는 fields라는 배열의 초기값이 들어가고,
      // 그 다음 변수는 field에 들어감
      // console.log(newUsers, field); // id, password
      if(users.hasOwnProperty(field)) { // users에 해당하는 키 값이 있는지 물어보는 것. 있으면 true
        // field에 id라는게 처음 들어오고 id라는 키가 있으면 이에 해당하는 키와 값을 밑에 줄 {}에 넣어준다.
        newUsers[field] = users[field];
      };
      return newUsers; // 이 리턴해낸 newUsers가 다음 파라미터인 newUsers로 들어가게 된다.
    }, {}); // newUsers의 초기값을 맘대로 지정해줄 수 있음. 여기서는 빈 오브젝트로 만들었음, {}, 이 오브젝트가 newUsers에 들어가서 빈 오브젝트가 만들어짐
    // console.log(newUsers);
    return newUsers;    
    // return this.#users;
  } // 이 메소드를 호출하면 새로운 user 정보, id, pw만 만들어서 전달해야함

  static getUserInfo(id) { // User.js의 login()에 getUserInfo하고 id 값을 던짐
    // const users = this.#users;
    return fs.readFile('./src/databases/users.json') // .는 app.js가 있는 경로
    // readFile 자체에서 promise를 제공, 반환
    // promise를 반환하면 then이라는 메소드에 접근할 수 있음
      .then((data) => {
        return this.#getUserInfo(data, id);
      }) // 해당 로직이 성공했을 때 실행

      // .catch((err) => console.log(err));
      .catch(console.error); // promise 반환하는 것에 대한 오류처리
      // 함수를 실행시키는데 파라미터로 넘어온 변수를 실행시키는 함수로 똑같이 넘기게 되면 생략 가능

    // , (err, data) => { // 에러와 파일의 데이터
    //   if(err) throw err;
      // const users = JSON.parse(data);
      // const idx = users.id.indexOf(id); // getUserInfo의 파라미터로 넘겨준 (id)
      // const usersKeys = Object.keys(users); // users의 키값들만 list로 만듦 => [id, password, name]
      // const userInfo = usersKeys.reduce((newUser, info) => { // [id, password, name]를 usersKeys에 넣어서 배열에 reduce를 돌려줌/ newUser의 초기값으로는 {}를 넣어줬음
      //   newUser[info] = users[info][idx]; // newUser에 키값이 순차적으로 들어감(처음에는 id) // users의 키값의 idx
      //   return newUser;
      // }, {});

      // return userInfo;
    // });
  }

  static save(userInfo) {
    // User.js에서 save메서드에 파라미터로 client 데이터를 던져주기 때문에 이 save 함수에서는 이 해당 데이터가 유저의 정보이기 때문에 userInfo로 받음
    // const users = this.#users;
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.password.push(userInfo.password);
    // 클라이언트에서 데이터를 전달하면 users 오브젝트 안에 해당 데이터들이 저장이 되야함
    return { success: true };
  }
};


// 데이터를 은닉화 시켜주고 메서드로 전달해줌

module.exports = UserStorage;