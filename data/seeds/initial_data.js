// This script will check if the User table is empty and if
// required seed the table with an initial Admin user.

const { keystone } = require("../../index");
const { GraphQLApp } = require("@keystonejs/app-graphql");
require("dotenv").config();

exports.seed = async knex => {
  // Connect to the database and initialise tables for new lists.
  await keystone.connect();

  // Unlike Migrations, Knex does not keep track of which
  // seed files have been run. Since we run this on start, we
  // need to check the table is empty before adding data.
  const rows = await knex("User").select("id");
  if (rows.length === 0) {
    // Start an instance of Keystone with a GraphQLApp so we can execute queries
    await keystone.prepare({
      apps: [new GraphQLApp()],
      distDir: "dist",
      dev: true
    });

    // Lets not hardcode a password :)
    const password = process.env.INITIAL_PASSWORD;
    const email = process.env.INITIAL_USER;
    // To create users we are using Keystone's executeQuery method
    // rather than knex("User").insert([]) to ensure passwords are
    // correctly hashed and hooks are executed.

    await keystone.executeQuery(
      `mutation initialUser($password: String, $email: String) {
            createUser(data: {name: "Admin", email: $email, isAdmin: true, password: $password}) {
              id
            }
          }`,
      {
        variables: {
          password,
          eamil
        }
      }
    );

    await keystone.disconnect();
    return true;
  }
  console.log("Database already seeded.");
  await keystone.disconnect();
  return false;
};
