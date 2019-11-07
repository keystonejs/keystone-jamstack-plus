const isUserAuthenticated = ({ authentication: { item } }) => !!item;
const isUserAdmin = ({ authentication: { item } }) =>
  Boolean(item && item.isAdmin);
const userOwnsItem = ({ authentication: { item }, existingItem }) => {
  if (item) {
    const userIsOwner = existingItem && item.id === existingItem.id;
    return Boolean(item.isAdmin || userIsOwner);
  }
  return false;
};

module.exports = {
  isUserAuthenticated,
  isUserAdmin,
  userOwnsItem
};
