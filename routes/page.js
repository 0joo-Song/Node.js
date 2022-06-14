const express = require('express');
const { isLoggedId, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

// 자신의 프로필은 로그인 상태여야 볼 수 있기 때문에 isLoggedId 사용
router.get('/profile', isLoggedId, (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird' });
});

// 로그인이 되어있지 않은경우 isNotLoggedIn
router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
});

router.get('/', (req, res, next) => {
  const twits = [];
  res.render('main', {
    title: 'NodeBird',
    twits,
  });
});

module.exports = router;