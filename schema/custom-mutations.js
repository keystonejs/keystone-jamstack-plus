const createPageIfNotExists = async (keystone, data) => {
  const list = keystone.lists.Page;
  let existingItem = await list.adapter.findOne({
    path: data.path
  });

  if (!existingItem) {
    existingItem = await list.adapter.create(data);
  }

  return existingItem;
};

const ADD_COMMENT = `
  mutation AddComment($id: ID!, $comment: CommentCreateInput!) {
    updatePage(id: $id, data: { comments:{ create:[$comment] } }){
      id
    }
  }`;

const ADD_BOOKMARK = `
mutation AddBookmark($user: ID!, $page: ID!) {
  updateUser(
      id: $user, 
      data: { 
        bookmarks: { connect: {id: $page} } 
      }
  ){
    id
  }
}`;

module.exports = {
  customMutations: keystone => {
    const incrementClap = async (_, { path, pageTitle }) => {
      const page = await createPageIfNotExists(keystone, {
        path,
        name: pageTitle
      });
      const { id } = page;
      const list = keystone.lists.Page;

      const newItem = await list.adapter.update(id, {
        ...page,
        claps: (page.claps || 0) + 1
      });
      return newItem;
    };

    const addComment = async (_, { path, comment, pageTitle }) => {
      const page = await createPageIfNotExists(keystone, {
        path,
        name: pageTitle
      });
      const { id } = page;

      await keystone.executeQuery(ADD_COMMENT, {
        variables: { id, comment }
      });

      return page;
    };

    const addBookmark = async (_, { path, user, pageTitle }) => {
      const page = await createPageIfNotExists(keystone, {
        path,
        name: pageTitle
      });
      const { id } = page;

      await keystone.executeQuery(ADD_BOOKMARK, {
        variables: { user, page: id }
      });

      const list = keystone.lists.User;
      const userItem = await list.adapter.findById(user);
      return userItem;
    };

    return [
      {
        schema: `clap(path: String!, pageTitle: String): Page`,
        resolver: incrementClap
      },
      {
        schema: `addComment(path: String!, pageTitle: String, comment: CommentCreateInput!): Page`,
        resolver: addComment
      },
      {
        schema: `addBookmark(path: String!, pageTitle: String, user: ID!): User`,
        resolver: addBookmark
      }
    ];
  }
};
