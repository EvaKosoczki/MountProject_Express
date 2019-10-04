var express = require('express');
var router = express.Router();
let MountBll = require('../db/mount_bll')
let MountDBSmp = new MountBll();


router.get('/mount', async (req, res, next) => {
  let allMounts = await MountDBSmp.getMountain('mountains');
  res.json(allMounts);
})

router.get('/mount/:id', async (req, res, next) => {
  let oneData = await MountDBSmp.getMountain('mountains', req.params.id)
  res.json(data);

})



router.post('/new', async (req, res, next) => {
  let newuser = await MountDBSmp.createUser(req.body);
  res.json(newuser);
})

router.post('/:id', async (req, res, next) => {
  let editeduser = await MountDBSmp.updateUserProfil(req.body);
  res.json(editeduser);
})




module.exports = router;