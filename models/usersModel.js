const db = require('../config/');

async function getUsers() {
    const users = await db('users').select('id', 'username', 'phoneNumber');
}

async function addUser(user) {
    const [id] = await db('users').insert(user);
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
    const user = await getUserBy({ id });
    delete user.password;
    return user;
}

module.exports = {
    getUsers,
    addUser,
    getUserBy,
    getUserById
};
