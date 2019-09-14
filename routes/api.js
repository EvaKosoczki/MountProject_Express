var express = require('express');
var router = express.Router();
let MountDB = require('../db/mountDb')
let MountDBSmp = new MountDB();


router.get('/mount', async (req, res, next) => {
  let allMounts = await MountDBSmp.getMountains();
  res.json(allMounts);
})

router.get('/:id', async (req, res, next) => {
  let data = await MountDBSmp.readUserProfil(req.params.id);
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