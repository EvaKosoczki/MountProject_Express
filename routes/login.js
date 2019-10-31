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

router.post('/', async (req, res, next) => {
  const result = await LoginDBSmp.loginUser(req.body);
  console.log(req.body)
  res.render('login');
})


module.exports = router;