const { Text, Integer, Relationship } = require("@keystone-alpha/fields");
const { isUserAuthenticated, isUserAdmin } = require("../access-controls");

const Clap = {
  schemaDoc: "Fresh hot-takes from the internet",
  fields: {
    path: { type: Text, schemaDoc: "Unique path for comments" },
    claps: { type: Integer, schemaDoc: "The number of claps" },
    user: { type: Relationship, ref: "User" }
  },
  access: {
    read: ({ authentication: { item } }) => {
      if (item.isAdmin) {
        return {}; // Don't filter items for admin users
      }
      // Return only approved comments
      return {
        approved: true
      };
    },
    create: isUserAuthenticated,
    update: isUserAuthenticated,
    delete: isUserAdmin
  }
};

module.exports = { Clap };
