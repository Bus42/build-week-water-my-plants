
exports.up = function (knex) {
    // create associative table for users and plants
    return knex.schema.createTable('users_plants', (table) => {
        table.increments('id').primary();
        table.integer('user_id').references('users.id').notNullable();
        table.integer('plant_id').references('plants.id').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users_plants');
};
