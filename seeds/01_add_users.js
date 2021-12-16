const usersData = require('../USERS_DATA');

exports.seed = function (knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert(usersData);
    });
};
