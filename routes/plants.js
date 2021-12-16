var express = require('express');
var router = express.Router();
const plantsDb = require('../models/plantsModel');

router.get('/', function (req, res, next) {
    plantsDb.getPlants().then(plants => res.status(200).json(plants))
        .catch(err => res.status(500).json({ error: err, message: "error getting plants" }));
});

module.exports = router;
