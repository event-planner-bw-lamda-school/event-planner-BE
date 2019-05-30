const knex = require("knex");
const db_config = require("./knexfile");
const db = knex(db_config["development"]);

module.exports = {
  addUser,
  findUser,
  getUsers
};

function addUser(user) {
  return db("users").insert(user);
}

function findUser(filter) {
  return db("users")
    .where({ email: filter })
    .first();
}

function getUsers() {
  return db("users");
}
