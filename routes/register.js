var express = require('express');
var router = express.Router();
let UserDB = require('../db/users_bll')
let UserDBSmp = new UserDB()


router.get('/', function (req, res, next) {
    res.render('register');
});

router.post('/', async (req, res, next) => {
    const result = await UserDBSmp.createUser(req.body);
    res.render('login')
})
module.exports = router;
