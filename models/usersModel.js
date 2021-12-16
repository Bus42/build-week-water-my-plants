require('dotenv').config();
const db = require('../config/');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

module.exports = {
    getUsers,
    addUser,
    getUserBy,
    getUserById,
    loginUser
};
