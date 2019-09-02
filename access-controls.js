const isUserAuthenticated = ({ authentication: { item } }) => !!item;

module.exports = {
  isUserAuthenticated
};
