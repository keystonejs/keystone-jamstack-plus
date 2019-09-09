const { Text, Checkbox, Relationship } = require("@keystone-alpha/fields");
const { isUserAuthenticated, isUserAdmin } = require("../access-controls");

const Comment = {
  schemaDoc: "Fresh hot-takes from the internet",
  fields: {
    name: { type: Text, schemaDoc: "Display name for Users comment" },
    email: {
      type: Text,
      schemaDoc: "Email could be used for comment validation"
    },
    comment: { type: Text, schemaDoc: "The comment" },
    path: { type: Text, schemaDoc: "Unique path for comments" },
    approved: {
      type: Checkbox,
      schemaDoc: "Only approved comments are shown"
    },
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
    update: isUserAdmin,
    delete: isUserAdmin
  },
  access: true
};

module.exports = { Comment };
