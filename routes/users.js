var express = require('express');
var router = express.Router();
const usersDb = require('../models/usersModel');

router.get('/', function (req, res, next) {
  usersDb.getUsers().then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: err, message: "error getting users" }));
});

module.exports = router;
