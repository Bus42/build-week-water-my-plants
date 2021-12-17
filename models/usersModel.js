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

async function loginUser(user) {
    const username = user.username;
    const users = await db('users').where({ username });
    const returnedUser = users[0];
    const isValid = bcrypt.compareSync(user.password, returnedUser.password);
    if (isValid) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
    return null;
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
    deleteUser
};
