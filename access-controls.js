const isUserAuthenticated = ({ authentication: { item } }) => !!item;
const isUserAdmin = ({ authentication: { item } }) => item.isAdmin;

module.exports = {
  isUserAuthenticated,
  isUserAdmin
};
