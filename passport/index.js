const passport = require('passport');
const local = require('./localStrategy');
//const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id } })
            .then(user => done(null,user))
            .catch(err => done(err));
    });

    local();
    //kakao();
}

/*
    모듈 내부에는 
    passport.serializeUser 와 passport.deserializeUser가 있다. 이부분이 passsport를 이해하는 핵심입니다.
    serializeUser는 로그인 시 실행되며 req.session 객체에 어떤 데이터를 저장할 지 정하는 메서드이다.
*/