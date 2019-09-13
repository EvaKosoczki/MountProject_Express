var express = require('express');
var router = express.Router();
let MountDB = require('../db/mountDb')
let MountDBSmp = new MountDB();

/* GET home page. */
router.get('/', async (req, res, next) => {
  let data = await MountDBSmp.readFirstAid()
  res.render('firstaid', {
    data: data
  });
});

router.get('/card/:id', async (req, res, next) => {
  let data = await MountDBSmp.readOneCard(req.params.id)
  console.log(data)
  res.render('oneCard', {
    data: data[0]
  });
})

module.exports = router;