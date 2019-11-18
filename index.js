require("dotenv").config();

const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { KnexAdapter } = require("@keystonejs/adapter-knex");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { StaticApp } = require("@keystonejs/app-static");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { User } = require("./schema/user");
const { Comment } = require("./schema/comment");
const { Page } = require("./schema/page");
const { customMutations } = require("./schema/custom-mutations");
const knexAdapter = new KnexAdapter();

const keystone = new Keystone({
  name: "keystone_blog_enrichment",
  adapter: knexAdapter,
  secureCookies: process.env.NODE_ENV === "production" ? true : false
});

keystone.createList("User", User);
keystone.createList("Comment", Comment);
keystone.createList("Page", Page);

const adminAuthStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User"
});

keystone.extendGraphQLSchema({
  mutations: customMutations(keystone)
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      authStrategy: adminAuthStrategy,
      isAccessAllowed: ({ authentication: { item } }) => {
        return item && item.isAdmin; // Only allow admin to access the UI
      }
    }),
    new StaticApp({ path: "/", src: "static" })
  ],
  configureExpress: app => {
    if (process.env.NODE_ENV !== "development") {
      app.set("trust proxy", true); // This setting is needed for Heroku
    }
  },
  knexAdapter
};
