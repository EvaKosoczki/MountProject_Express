var express = require('express');
var router = express.Router();
let MountBll = require('../db/mount_bll')
let UsersBll = require('../db/users_bll')

let MountDBSmp = new MountBll();
let UserDBSmp = new UsersBll();

router.get('/mountains', async (req, res, next) => {
  let allMounts = await MountDBSmp.getMountain();
  res.json(allMounts);
})

router.get('/mountains/:id', async (req, res, next) => {
  let oneData = await MountDBSmp.getMountain(req.params.id)
  res.json(oneData);

})

router.get('/users', async (req, res, next) => {
  let allUsers = await UserDBSmp.getUsers();
  res.json(allUsers);
})

router.get('/users/:id', async (req, res, next) => {
  let oneData = await UserDBSmp.getUsers(req.params.id)
  res.json(oneData);

})

/*
router.post('/new', async (req, res, next) => {
  let newuser = await MountDBSmp.createUser(req.body);
  res.json(newuser);
})
*/
router.post('/users/:id', async (req, res, next) => {
  console.log(req.body)
  let editeduser = await UserDBSmp.updateUserProfile(req.body);
  res.json(editeduser);
})




module.exports = router;