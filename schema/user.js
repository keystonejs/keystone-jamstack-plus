const {
  Text,
  Checkbox,
  Password,
  CalendarDay
} = require("@keystone-alpha/fields");
const { isUserAuthenticated } = require("../access-controls");

const User = {
  fields: {
    name: { type: Text },
    email: { type: Text, isUnique: true },
    password: { type: Password },
    isAdmin: { type: Checkbox },
    endDate: { type: CalendarDay }
  },
  access: isUserAuthenticated
};
module.exports = { User };
