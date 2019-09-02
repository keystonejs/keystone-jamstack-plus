require("dotenv").config();

const { Keystone, PasswordAuthStrategy } = require("@keystone-alpha/keystone");
const { MongooseAdapter } = require("@keystone-alpha/adapter-mongoose");
const { GraphQLApp } = require("@keystone-alpha/app-graphql");
const { AdminUIApp } = require("@keystone-alpha/app-admin-ui");
const { User } = require("./schema/user");
const { Comment } = require("./schema/comment");

const keystone = new Keystone({
  name: "keystone-blog-enrichment",
  adapter: new MongooseAdapter(process.env.DB_URL)
});

keystone.createList("User", User);
keystone.createList("Comment", Comment);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User"
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy
    })
  ]
};
