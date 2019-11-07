const { Text, Integer, Relationship } = require("@keystonejs/fields");
const { isUserAdmin } = require("../access-control");

const defaultFieldAccess = {
  create: isUserAdmin, // This will be ignored by custom mutation
  update: isUserAdmin,
  read: true
};

const Page = {
  schemaDoc: "Page data",
  fields: {
    name: {
      type: Text,
      schemaDoc: "Name of page",
      access: defaultFieldAccess
    },
    path: {
      type: Text,
      schemaDoc: "Unique path for page",
      isUnique: true,
      isRequired: true,
      access: defaultFieldAccess
    },
    claps: {
      type: Integer,
      schemaDoc: "The number of claps"
    },
    comments: {
      type: Relationship,
      ref: "Comment.page",
      many: true
    }
  },
  access: { create: isUserAdmin, read: true, update: true } // This access control will be ignored by our custom mutations
};

module.exports = { Page };
