// This file is not used by Keystone but is required for migrations.
// See: http://knexjs.org/#knexfile

let databaseName = "keystone_blog_enrichment";
let connectionString =
  process.env.CONNECT_TO ||
  process.env.DATABASE_URL ||
  process.env.KNEX_URI ||
  `postgres://localhost/${databaseName}`;

module.exports = {
  client: "postgres",
  connection: connectionString,
  seeds: {
    directory: "./data/seeds"
  },
  migrations: {
    directory: "./data/migrations"
  }
};
