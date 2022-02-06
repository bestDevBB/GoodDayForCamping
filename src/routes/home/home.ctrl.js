"use strict";

const home = (req, res) => {
    res.render('home/index.ejs'); // views라는 폴더로 지정해놨기 때문에 home 폴더부터
    console.log(req.url, "/ 화면");
};

const login = (req, res) => {
    res.render('home/login.ejs');
    console.log(req.url, '/login 화면');
};

module.exports = {
    home,
    login
};