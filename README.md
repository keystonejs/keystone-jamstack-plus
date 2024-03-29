<div align="center">
  <h1>⚠️ Archived</h1>
  <p>This repository is archived and is no longer maintained.</p>
  <p>For the latest Keystone release please visit <a href="https://keystonejs.com">the Keystone website.</a></p>
  <hr>
</div>
<br>

## Keystone JAMstack Plus starter-kit

### Getting started

This is a [KeystoneJS](https://github.com/keystonejs/keystone) starter-kit that provides an API for a static blog or website. 

It's best paired with [Supermaya](https://github.com/MadeByMike/supermaya), a super fast [Eleventy](https://github.com/11ty/eleventy/) template that will add features such as comments, claps, reading lists and login when the back-end it configured.

The idea is: rather than adding a bunch of third-party services to a static site's build process, why not own the data, get rid of the build processes, unify all of your API and build simple custom services?

If you're interested in giving this a try, you can deploy all of the services in a few simple steps. 

First, click on the Deploy button below to deploy the backend to Heroku. Don't forget to set the initial admin password during the install.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/MadeByMike/keystone-jamstack-plus)

Once it's deployed, click on the 'View App' button to launch the welcome page. It has instructions on how to set-up the accompanying front-end with a similar one click button!

**Note**: This will deploy a free instance on Heroku which will sleep periodically if not used and can result in a slow API response time after periods of inactivity. You can upgrade to a hobby instance to avoid this.


## Running locally?

Read the [Getting started guide](https://v5.keystonejs.com/quick-start/) for KeystoneJS. 

```
yarn run dev
```

Then visit:

- The KeystoneJS Admin UI at [`http://localhost:3000/admin`](http://localhost:3000/admin)
- The GraphQL Playground at [`http://localhost:3000/admin/graphiql`](http://localhost:3000/admin/graphiql)
