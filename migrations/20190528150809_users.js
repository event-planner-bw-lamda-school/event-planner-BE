exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", user => {
    user.increments(); // unique ID

    user
      .string("email", 100)
      .notNullable()
      .unique();

    user
      .string("name", 100)
      .notNullable()
      .unique();

    user
      .string("company", 100)
      .notNullable()
      .unique();

    user
      .string("role", 100)
      .notNullable()
      .unique();

    user.string("password", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
