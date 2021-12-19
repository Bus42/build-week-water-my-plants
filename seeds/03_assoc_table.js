const users_plants = require("../MOCK_USERS_PLANTS_DATA");

exports.seed = function (knex) {
  return knex('users_plants').del()
    .then(function () {
      return knex('users_plants').insert(users_plants);
    });
};
