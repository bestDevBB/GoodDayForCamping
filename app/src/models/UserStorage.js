"use strict";

class UserStorage { // class
  // class 자체에서 users에 접근하고자 할 떄는 변수에 static을 선언해서 정적 변수로 만들어줌
  static #users = { // const같은 선언자 필요 없음
    // #는 public한 변수에서 private한 변수로 선언해줌. 외부에서 불러올 수 없게함
    id: ["BB", "Moong", "ZOE"],
    password: ["1234", "123456", "1111"],
    name: ["LBR", "뭉이", "조이"]
  };

  // 외부에서 데이터를 받을 수 있게
  static getUsers(...fields) { // class 자체에서 메서드에 접근을 하려면 또한 static을 붙혀줌
    // console.log(fields); // 변수명에 파라미터로 넘긴 데이터들이 배열 형태로 들어옴, ['id', 'password']
    const users = this.#users;
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
};

// 데이터를 은닉화 시켜주고 메서드로 전달해줌

module.exports = UserStorage;