# Seeding and Migrations

If you make changes to a Keystone List and have existing data, you will need to run migrations.

This project uses Knex migration and seed files. Seeding and migrations are run
(if required) everytime Keystone is started. See the `prestart` script in `package.json`.

The data folder contains all of the migration and seed files.

You can create a new migration file with the command `npx knex migrate:make migration_name`.

See the [Keystone Migration Guide](https://www.keystonejs.com/guides/migrations) and [Knex Migration Documentation](http://knexjs.org/#Migrations-CLI) for more information.
