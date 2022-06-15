const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

// passport-local 모듈에서 Strategy 생성자를 불러와 그 안에 구현
module.exports = () => {
    // 1. LocalStrategy 생성자의 첫번째 인수로 주어진 객체는 전략에 관한 설명을 한다.
    //    user 필드와 password 필드에 일치하는 로그인 라우터의 req.body 속성명을 적는다
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',

    // 실제 전략을 수행하는 async 함수 
    }, async (email, password, done) => {
        try {
            const exUser = await User.findOne({ where: {email} });
            if(exUser){
                const result = await bcrypt.compare(password, exUser.password);
                if(result){
                    done(null, exUser);
                }else{
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.'});
                }
            }else{
                done,(null, false, { message: '가입되지 않은 회원입니다.'});
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};