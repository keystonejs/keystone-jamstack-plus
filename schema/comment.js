const { Text, Checkbox } = require("@keystone-alpha/fields");
const { isUserAuthenticated } = require("../access-controls");

const Comment = {
  schemaDoc: "Fresh hot-takes from the internet",
  fields: {
    name: { type: Text, schemaDoc: "Display name for Users comment" },
    email: {
      type: Text,
      schemaDoc: "Email could be used for comment validation"
    },
    comment: { type: Text, schemaDoc: "The comment" },
    path: { type: Text, schemaDoc: "Where this opinion belongs" },
    approved: {
      type: Checkbox,
      schemaDoc: "Only approved comments are shown"
    }
  },

  access: {
    read: ({ authentication: { item } }) => {
      if (item) {
        return {}; // Don't filter any items for authenticated users
      }
      // Return only approved comments
      return {
        approved: true
      };
    },
    create: () => true,
    update: isUserAuthenticated,
    delete: isUserAuthenticated
  }
};

module.exports = { Comment };
