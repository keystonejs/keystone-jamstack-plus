const {
  Text,
  Checkbox,
  Password,
  Relationship
} = require("@keystonejs/fields");
const { userOwnsItem } = require("../access-control");

const defaultFieldAccess = {
  create: true,
  update: userOwnsItem,
  read: userOwnsItem
};

const User = {
  fields: {
    name: {
      type: Text,
      access: { ...defaultFieldAccess, read: true }
    },
    email: {
      type: Text,
      isUnique: true,
      access: defaultFieldAccess
    },
    password: {
      type: Password,
      access: defaultFieldAccess
    },
    isAdmin: {
      type: Checkbox,
      access: { ...defaultFieldAccess, create: () => false }
    },
    bookmarks: {
      type: Relationship,
      ref: "Page",
      many: true,
      access: defaultFieldAccess
    }
  }
};
module.exports = { User };
