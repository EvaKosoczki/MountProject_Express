var express = require('express');
var router = express.Router();
let MountDB = require('../db/mountDb')
let MountDBSmp = new MountDB();

router.get('/:id', async (req, res, next) => {
  let data = await MountDBSmp.readUserProfil(req.params.id)
  res.json(data)

})

router.post('/:id', async (req, res, next) => {
  let editeduser = await MountDBSmp.updateUserProfil(req.body)
  res.json(editeduser)
})

module.exports = router;