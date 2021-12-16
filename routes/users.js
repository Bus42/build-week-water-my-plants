var express = require('express');
var router = express.Router();
const usersDb = require('../models/usersModel');
const bcrypt = require('bcrypt');

router.get('/', function (req, res, next) {
  usersDb.getUsers().then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: err, message: "error getting users" }));
});

router.post('/', function (req, res, next) {
  const userInfo = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    phoneNumber: req.body.phoneNumber
  }
  usersDb.addUser(userInfo).then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err, message: "error adding user" }));
})

module.exports = router;
