const plantsData = require('../PLANTS_DATA');

exports.seed = function (knex) {
  return knex('plants').del()
    .then(function () {
      return knex('plants').insert(plantsData);
    });
};
