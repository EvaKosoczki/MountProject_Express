var express = require('express');
var router = express.Router();
let MountBll = require('../db/mount_bll')
let MountDBSmp = new MountBll();

/* GET home page. */
router.get('/', async (req, res, next) => {
  let data = await MountDBSmp.getMountain()
  res.render('mountains', {
    datas: data
  });
});

router.get('/details/:id', async (req, res, next) => {
  let oneData = await MountDBSmp.getMountain('id', req.params.id)
  let oneFA
  try {
    oneFA = await MountDBSmp.getFirstAscent(oneData[0].Mountain)
  } catch (err) {
    console.log(err)
  }
  res.render('details', {
    oneData: oneData[0],
    oneFA: oneFA[0]
  })
})


module.exports = router;