const db = require('../config/');

async function getUsers() {
    return await db('users').select();
}

module.exports = {
    getUsers
}