require("dotenv").config();

// Lets not hardcode password, even for test data
const password = process.env.INITIAL_PASSWORD;

const initialData = {
  User: [
    {
      name: "Admin",
      email: "admin@keystonejs.com",
      isAdmin: true,
      password
    }
  ]
};

module.exports = async keystone => {
  // Check the users list to see if there are any; if we find none, assume
  // it's a new database and initialise.
  const users = await keystone.lists.User.adapter.findAll();
  if (!users.length) {
    console.log("\n 💾 Creating initial data...");
    await keystone.createItems(initialData);
  } else {
    console.log(
      "\n Keystone has been initialised. Please remove `initialiseData` from the `index.js` file."
    );
  }
};
