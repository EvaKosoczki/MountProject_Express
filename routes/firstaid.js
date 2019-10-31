var express = require('express');
var router = express.Router();
let FirstAidDB = require('../db/firstaid_bll')
let FirstAidDBSmp = new FirstAidDB();

/* GET home page. */
router.get('/', async (req, res, next) => {
  let data = await FirstAidDBSmp.getFaTips()
  res.render('firstaid', {
    data: data
  });
});

router.get('/card/:id', async (req, res, next) => {
  let data = await FirstAidDBSmp.getFaTips('id', req.params.id)
  res.render('oneCard', {
    data: data[0]
  });
})

module.exports = router;