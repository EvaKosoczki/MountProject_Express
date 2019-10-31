var express = require('express');
var router = express.Router();
var LoginDB = require('../db/login_bll');
var LoginDBSmp = new LoginDB()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', {
    title: 'Express'
  });
});

const getToken = (l = 20) => {
  let result = '';
  for (let i = 0; i < l; i++) {
    const index = Math.round(Math.random() * 25 + 65);
    result += String.fromCharCode(index);
  }
  return result;
};

router.post('/', async (req, res, next) => {
  const result = await LoginDBSmp.loginUser(req.body);
  if (result.length === 1) {
    const token = getToken();
    res.cookie('uuid', token);
    tokenObj = { cookie: token, id: result[0].id };
    await LoginDBSmp.updateToken(tokenObj);
    res.redirect('/');
  }
  res.render('login');
})


module.exports = router;