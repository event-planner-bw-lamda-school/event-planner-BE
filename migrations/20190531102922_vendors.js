exports.up = function(knex, Promise) {
  return knex.schema.createTable("vendors", vendor => {
    vendor.increments();

    vendor.string("name", 255).notNullable();

    vendor.string("description", 1500).notNullable();

    vendor.integer("price").notNullable();
  });
};

exports.down = function(knex, Promise) {};
