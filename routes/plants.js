var express = require('express');
var router = express.Router();
const plantsDb = require('../models/plantsModel');

router.get('/', function (req, res, next) {
    plantsDb.getPlants().then(plants => res.status(200).json(plants))
        .catch(err => res.status(500).json({ error: err, message: "error getting plants" }));
});

router.get('/:id', function (req, res) {
    plantsDb.getPlantById(req.params.id).then(plant => res.status(200).json(plant))
        .catch(err => res.status(500).json({ error: err, message: "error getting plant" }));
});

router.post("/", function (req, res) {
    plantsDb.addPlant(req.body).then(plant => res.status(200).json(plant))
        .catch(err => res.status(500).json({ error: err, message: "error adding plant" }));
});

router.put("/:id", function (req, res) {
    const id = req.params.id;
    const plant = req.body;
    plantsDb.updatePlant({ id, plant }).then(updatedPlant => res.status(200).json(updatedPlant))
});

router.delete("/:id", function (req, res) {
    const id = req.params.id;
    plantsDb.deletePlant(id).then(() => res.status(200).json(`user ${id} deleted`))
        .catch(err => res.status(500).json({ error: err, message: "error deleting plant" }));
});

module.exports = router;
