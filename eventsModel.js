const knex = require("knex");
const db_config = require("./knexfile");
const events = knex(db_config["development"]);

module.exports = {
  addEvent,
  findEvent,
  getEvent,
  events
};

function addEvent(event) {
  return db("events").insert(event);
}

function findEvent(filter) {
  return db("events");
  // .where({ email: filter })
  // .first();
}

function getEvent() {
  return db("events");
}
