require("dotenv").config();

const { Keystone } = require("@keystone-alpha/keystone");
const { PasswordAuthStrategy } = require("@keystone-alpha/auth-password");
const { KnexAdapter } = require("@keystone-alpha/adapter-knex");
const { GraphQLApp } = require("@keystone-alpha/app-graphql");
const { AdminUIApp } = require("@keystone-alpha/app-admin-ui");
const { User } = require("./schema/user");
const { Comment } = require("./schema/comment");
const { Clap } = require("./schema/clap");
const initialiseData = require("./initialise-data.js");

const keystone = new Keystone({
  name: "keystone-blog-enrichment",
  adapter: new KnexAdapter(),
  onConnect: initialiseData
});

keystone.createList("User", User);
keystone.createList("Comment", Comment);
keystone.createList("Clap", Clap);

const adminAuthStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User"
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy: adminAuthStrategy,
      filterAdminAccess: user => {
        return user.isAdmin;
      }
    })
  ]
};
