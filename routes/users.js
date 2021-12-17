var express = require('express');
var router = express.Router();
const usersDb = require('../models/usersModel');
const bcrypt = require('bcrypt');

router.get('/', function (req, res) {
  usersDb.getUsers().then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: err, message: "error getting users" }));
});

router.post('/', function (req, res) {
  usersDb.addUser(req.body).then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err, message: "error adding user" }));
})

router.post('/login', async function (req, res) {
  const token = await usersDb.loginUser(req.body);
  if (token) {
    res.status(200).json(token);
  }
  else {
    res.status(401).json({ message: "invalid credentials" });
  }
})

router.get("/:id", function (req, res) {
  usersDb.getUserById(req.params.id).then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err, message: "error getting user" }));
})

router.put('/:id', (req, res) => {
  usersDb.updateUser({ id: req.params.id, user: req.body })
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(err => res.status(500).json({ error: err, message: "error updating user" }));
})

router.delete('/:id', (req, res) => {
  usersDb.deleteUser(req.params.id).then(user => res.status(200).json({message: "user deleted", user}))
    .catch(err => res.status(500).json({ error: err, message: "error deleting user" }));
})

module.exports = router;
