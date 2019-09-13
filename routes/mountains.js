var express = require('express');
var router = express.Router();
let MountDB = require('../db/mountDb')
let MountDBSmp = new MountDB();

/* GET home page. */
router.get('/', async (req, res, next) => {
  let data = await MountDBSmp.getMountains()
  res.render('mountains', {
    datas: data
  });
});

router.get('/details/:id', async (req, res, next) => {
  let oneData = await MountDBSmp.getOneMountains(req.params.id)
  let oneFA
  try {
    oneFA = await MountDBSmp.getOneFA(oneData[0].Mountain)
  } catch (err) {
    console.log(err)
  }
  res.render('details', {
    oneData: oneData[0],
    oneFA: oneFA[0]
  })
})


module.exports = router;
