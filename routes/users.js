var express = require('express');
var router = express.Router();
const usersDb = require('../models/usersModel');
const bcrypt = require('bcrypt');
const { restricted, checkUsernameFree, checkPasswordLength, checkCredentials } = require('../middleware');
const jwt = require('jsonwebtoken');

router.get('/', restricted, (req, res) => {
  usersDb.getUsers().then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: err, message: "error getting users" }));
});

router.post('/', checkUsernameFree, checkPasswordLength, (req, res) => {
  usersDb.addUser(req.body).then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err, message: "error adding user" }));
})

router.post('/login', checkCredentials, async (req, res) => {
  const user = await usersDb.loginUser(req.body)
    .then(token => res.status(200).json(token))
    .catch(err => res.status(500).json({ error: err, message: "error logging in" }));
})

router.get("/:id", restricted, (req, res) => {
  usersDb.getUserById(req.params.id).then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err, message: "error getting user" }));
})

router.get("/:id/plants", restricted, (req, res) => {
  usersDb.getUserPlants(req.params.id).then(plants => res.status(200).json(plants))
    .catch(err => res.status(500).json({ error: err, message: "error getting plants" }));
})

router.post("/:id/plants", restricted, (req, res) => {
  const payload = { user_id: req.params.id, plant_id: req.body.plant_id };
  usersDb.addUserPlant(payload).then(plants => res.status(200).json(plants))
    .catch(err => res.status(500).json({ error: err, message: "error adding plant" }));
});

router.delete("/:id/plants", restricted, (req, res) => {
  const payload = { user_id: req.params.id, plant_id: req.body.plant_id };
  usersDb.deleteUserPlant(payload).then(plants => res.status(200).json(plants))
    .catch(err => res.status(500).json({ error: err, message: "error deleting plant" }));
})

router.put('/:id', restricted, (req, res) => {
  usersDb.updateUser({ id: req.params.id, user: req.body })
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(err => res.status(500).json({ error: err, message: "error updating user" }));
})

router.delete('/:id', restricted, (req, res) => {
  usersDb.deleteUser(req.params.id).then(user => res.status(200).json({ message: "user deleted", user }))
    .catch(err => res.status(500).json({ error: err, message: "error deleting user" }));
})

module.exports = router;
