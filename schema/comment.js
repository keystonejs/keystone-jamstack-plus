const {
  Text,
  Checkbox,
  Relationship,
  DateTime
} = require("@keystonejs/fields");
const { Markdown } = require("@keystonejs/fields-markdown");
const { isUserAdmin } = require("../access-control");
const striptags = require("striptags");

const Comment = {
  schemaDoc: "Fresh hot-takes from the internet",
  fields: {
    name: { type: Text, schemaDoc: "Display name for Users", isRequired: true },
    email: {
      type: Text,
      schemaDoc: "Email - could be used for user validation",
      isRequired: true,
      access: {
        read: isUserAdmin, // Protect emails
        create: true,
        update: isUserAdmin
      }
    },
    body: {
      type: Markdown,
      schemaDoc: "The opinion",
      isRequired: true
    },
    date: {
      type: DateTime,
      schemaDoc: "Time of the opinion",
      format: "MM/DD/YYYY h:mm A",
      access: {
        read: true,
        create: true,
        update: isUserAdmin
      }
    },
    approved: {
      type: Checkbox,
      schemaDoc: "Only approved comments are shown",
      access: {
        read: true,
        create: isUserAdmin,
        update: isUserAdmin
      }
    },
    page: { type: Relationship, ref: "Page.comments" },
    user: { type: Relationship, ref: "User" }
  },
  access: {
    read: ({ authentication: { item } }) => {
      if (item && item.isAdmin) {
        return {}; // Don't filter items for admin users
      }
      // Return only approved comments for non-admin users
      return {
        approved: true
      };
    },
    create: true,
    update: isUserAdmin,
    delete: isUserAdmin
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      if (resolvedData.body) {
        return {
          ...resolvedData,
          date: new Date().toISOString(),
          body: striptags(resolvedData.body) // Don't allow any HTML
        };
      }
      return resolvedData;
    }
  }
};

module.exports = { Comment };
