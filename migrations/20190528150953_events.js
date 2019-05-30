
exports.up = function(knex, Promise) {
    return knex.schema.createTable('events', event => {
        event
            .increments() // give unique ID

        event
            .string('name', 255)
            .notNullable();

        event
            .string('description', 1500)
            .notNullable();

        event
            .integer('date')
            .notNullable();

        event
            .integer('time')
            .notNullable();

        event
            .integer('budget')
            .notNullable();

        })
   
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('events');

};
