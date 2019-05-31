exports.up = function(knex, Promise) {
  return knex.schema.createTable("toDoList", toDo => {
    toDo.increments(); //increment automatically

    toDo.string("toDo", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {};
