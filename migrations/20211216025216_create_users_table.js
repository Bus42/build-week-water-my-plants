
exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('phoneNumber').notNullable();
        table.string('password').notNullable();
    }
    );
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
