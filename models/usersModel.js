require('dotenv').config();
const db = require('../config/');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const colors = require('colors');

async function getUsers() {
    const users = await db('users').select('id', 'username', 'phoneNumber');
    return users;
}

async function addUser(user) {
    const hashedUser = {
        username: user.username,
        password: bcrypt.hashSync(user.password, 8),
        phoneNumber: user.phoneNumber
    }
    const [id] = await db('users').insert(hashedUser);
    const users = await db('users').where({ id });
    const returnedUser = users[0];
    delete returnedUser.password;
    return returnedUser;
}

async function getUserBy(filter) {
    const users = await db('users').where(filter);
    return users[0];
}

async function getUserById(id) {
    const users = await db('users').where({ id });
    const returnedUser = users[0];
    delete returnedUser.password;
    return returnedUser;
}

async function getUserPlants(user_id) {
    const userPlants = await db('users_plants')
        .join('plants', 'users_plants.plant_id', 'plants.id')
        .where({ user_id });
    return userPlants
}

async function addUserPlant({ user_id, plant_id }) {
    console.log(colors.bgGreen.black.bold(`Adding plant ${plant_id} to user ${user_id}`));
    const [id] = await db('users_plants').insert({ user_id, plant_id });
    const userPlants = await db('users_plants')
        .join('plants', 'users_plants.plant_id', 'plants.id')
        .where({ user_id });
    return userPlants;
}

async function deleteUserPlant({ user_id, plant_id }) {
    const success = await db('users_plants').where({ user_id, plant_id }).del();
    if (success) {
        console.log(colors.bgYellow.black.bold(`User ${user_id} deleted plant ${plant_id}`));
        // return list of user plants
        const userPlants = await db('users_plants')
            .join('plants', 'users_plants.plant_id', 'plants.id')
            .where({ user_id });
        return userPlants;
    } else {
        console.log(colors.bgRed.white.bold('error deleting user plant'));
    }
}

async function loginUser({ username }) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { username, token };
}

async function updateUser({ id, user }) {
    const hash = bcrypt.hashSync(user.password, 8);
    const hashedUser = {
        username: user.username,
        password: hash,
        phoneNumber: user.phoneNumber
    }
    const success = await db('users').where({ id }).update(hashedUser);
    if (success) {
        console.log(colors.bgYellow.black.bold(`User ${id} updated`));
        return await getUserById(id);
    } else {
        console.log(colors.bgRed.white.bold('error updating user'));
    }
}

async function deleteUser(id) {
    const success = await db('users').where({ id }).del();
    if (success) {
        console.log(colors.bgYellow.black.bold(`User ${id} deleted`));
        return { id };
    } else {
        console.log(colors.bgRed.white.bold('error deleting user'));
    }
}

module.exports = {
    getUsers,
    addUser,
    getUserBy,
    getUserById,
    loginUser,
    updateUser,
    deleteUser,
    getUserPlants,
    addUserPlant,
    deleteUserPlant
};
