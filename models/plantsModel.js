const db = require('../config/');

async function getPlants() {
    return await db('plants').select();
}

module.exports = {
    getPlants
}