const db = require('../config/');
const colors = require('colors');

async function getPlants() {
    return await db('plants');
}

async function getPlantBy(filter) {
    return await db('plants').where(filter);
}

async function getPlantById(id) {
    return await db('plants').where({ id });
}

async function addPlant(plant) {
    return await db('plants').insert(plant);
}

async function updatePlant({ id, plant }) {
    const success = await db('plants').where({ id }).update(plant);
    if (success) {
        console.log(colors.bgYellow.black.bold(`Plant ${id} updated`));
        return await getPlantById(id);
    } else {
        console.log(colors.bgRed.black.bold(`Internal error updating Plant ${id}`));
        return null;
    }
}

async function deletePlant(id) {
    console.log(id)
    const success = await db('plants').where({ id }).del();
    if (success) {
        console.log(colors.bgYellow.black.bold(`Plant ${id} deleted`));
        return true;
    } else {
        console.log(colors.bgRed.black.bold(`Internal error deleting Plant ${id}`));
        return false;
    }
}

module.exports = {
    getPlants,
    getPlantBy,
    getPlantById,
    addPlant,
    updatePlant,
    deletePlant
};